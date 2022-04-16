from api.serializers import DatabaseSerializer
from .models import SpotifyToken
from api.models import Attributes, Database
from django.utils import timezone 
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get

#url stem used for all api calls to spotify
URL_STEM = "https://api.spotify.com/v1/"

#Check if there is a token for a specific user 
def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    #if tokens exist, return token
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

#searches for user in spotifytoken table, if it exists, delete the record
def logout_button(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        #session_id.session.delete()
        user_tokens[0].delete()

#User Tokens expire in 1 hr 
#User tokens expire in 3600 seconds 
#Convert seconds into timestamp
#Want to store time the token expires 
#get current time and add hour to it and store in database 
#easy to check if token expired 
def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in) #converts seconds into timedelta and adds to timestamp

    #If token exists, update 
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    #If token doesnt exist, save to database 
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, 
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()

def getUserEmail(session_id):
    searchQuery = "me"
    return execute_spotify_api_request(session_id, searchQuery)


def getSongInfo(session_id, id):
    searchQuery = "audio-features/" + id
    return execute_spotify_api_request(session_id, searchQuery)


def storeSong(data, email, id):
    user_song = Database.objects.filter(userEmail=email, trackID=id)
    #print('user song in db (if exists): ' + user_song[0])

    #if song exist in db, return song information
    if user_song.exists():
        return DatabaseSerializer(user_song[0]).data
    else:
        #else store song in db and return information
        song = Database(userEmail=email, trackID=id, loudness=data, location=None, mood=None, activity=None, custom_attr=None, custom_attrtwo=None, custom_attrthree=None)
        song.save()
        user_song = Database.objects.filter(userEmail=email, trackID=id)
        return DatabaseSerializer(user_song[0]).data


#Check if spotify is authenticated already 
#if current time has passed expire rate, refresh token 
def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True
    return False

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)

#create request url using user's id and the endpoint from spotify's api
def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)

    #send authorization token to spotify 
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token}

    #Send POST request
    if post_:
        post(URL_STEM + endpoint, headers=headers)

    #Send PUT request 
    if put_:
        put(URL_STEM + endpoint, headers=headers)

    #Send GET request 
    response = get(URL_STEM + endpoint, {}, headers=headers)

    #if there is an issue sending json, return Error 
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}

#search function that creates query string and calls api request function
def search(session_id, search):
    searchQuery = "search?q=" + search + "&type=track&include_external=audio&limit=50"
    return execute_spotify_api_request(session_id, searchQuery)

#submit query to get recently played track
def recentlyPlayed(session_id):
    query = "me/player/recently-played?q=limit=1"
    return execute_spotify_api_request(session_id, query)

#rmv attr from song
def rmvAttr(attrType, email, id):
    user_song = Database.objects.get(userEmail=email, trackID=id)

    if (attrType == "location"):
        user_song.location = None
        user_song.save(update_fields=['location'])
    elif (attrType == "mood"):
        user_song.mood = None
        user_song.save(update_fields=['mood'])
    elif (attrType == "activity"):
        user_song.activity = None
        user_song.save(update_fields=['activity'])
    elif (attrType == "custom_attr"):
        user_song.custom_attr = None
        user_song.save(update_fields=['custom_attr'])
    elif (attrType == "custom_attrtwo"):
        user_song.custom_attrtwo = None
        user_song.save(update_fields=['custom_attrtwo'])
    elif (attrType == "custom_attrthree"):
        user_song.custom_attrthree = None
        user_song.save(update_fields=['custom_attrthree'])    
    user_song = Database.objects.filter(userEmail=email, trackID=id)
    return DatabaseSerializer(user_song[0]).data

#add attr to song
def addAttr(attrType, attrDesc, email, id):
    user_song = Database.objects.get(userEmail=email, trackID=id)

    if (attrType == "location"):
        user_song.location = attrDesc
        user_song.save(update_fields=['location'])
    elif (attrType == "mood"):
        user_song.mood = attrDesc
        user_song.save(update_fields=['mood'])
    elif (attrType == "activity"):
        user_song.activity = attrDesc
        user_song.save(update_fields=['activity'])
    elif (attrType == "custom_attr"):
        user_song.custom_attr = attrDesc
        user_song.save(update_fields=['custom_attr'])
    elif (attrType == "custom_attrtwo"):
        user_song.custom_attrtwo = attrDesc
        user_song.save(update_fields=['custom_attrtwo'])
    elif (attrType == "custom_attrthree"):
        user_song.custom_attrthree = attrDesc
        user_song.save(update_fields=['custom_attrthree'])   
    user_song = Database.objects.filter(userEmail=email, trackID=id)
    return DatabaseSerializer(user_song[0]).data

#get all of the user's custom attr
def getCustomAttr(email):
    attributes = Attributes.objects.values_list('attr', flat=True).filter(userEmail=email)
    print(attributes)
    return attributes

#deprecated, but keep for further analysis
def findUserSong(email, id):
    user_song = Database.objects.filter(userEmail=email, trackID=id)
    return DatabaseSerializer(user_song[0]).data

#remove all attributes from song
def clearAttributes(email, id):
    user_song = Database.objects.get(userEmail=email, trackID=id)
    user_song.location = None
    user_song.mood = None
    user_song.activity = None
    user_song.custom_attr = None
    user_song.custom_attrtwo = None
    user_song.custom_attrthree = None
    user_song.save()
    user_song = Database.objects.filter(userEmail=email, trackID=id)
    return DatabaseSerializer(user_song[0]).data
