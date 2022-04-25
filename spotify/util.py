from api.serializers import CustomAttributesSerializer, DatabaseSerializer
from .models import SpotifyToken
from api.models import *
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

#Want to rename to get UserInfo 
def getUserInfo(session_id):
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
    attributes = CustomAttributes.objects.values_list('attr', flat=True).filter(userEmail=email)
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

def addCustomAttr(email, desc):
    user_attr = CustomAttributes.objects.filter(userEmail=email, attr=desc)

    #if attr exist in db, return attr information
    if user_attr.exists():
        return CustomAttributesSerializer(user_attr[0]).data
    else:
        #else store attr in db and return information
        attr = CustomAttributes(userEmail=email, attr=desc)
        attr.save()
        user_attr = CustomAttributes.objects.filter(userEmail=email, attr=desc)
        return CustomAttributesSerializer(user_attr[0]).data

def create_playlist(session_id, userID, playlistName):
    tokens = get_user_tokens(session_id)
    description = "By LifeOST"
    endpoint = "users/" + userID + "/playlists"
    data = '{"name": "' + playlistName + '", "description": "' + description + '", "public":true }'
    print(data)
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token}
    return post(URL_STEM + endpoint, data=data, headers=headers)

def get_playlist_info(session_id):
    endpoint = "me/playlists?limit=1&offset=0"
    return execute_spotify_api_request(session_id, endpoint)

def add_track_to_playlist(session_id, playlistID, trackID):
    track = "spotify%3Atrack%3A"
    endpoint = "playlists/" + playlistID + "/tracks?uris=" + track + trackID
    return execute_spotify_api_request(session_id, endpoint, post_=True)

def get_playlist_tracks(session_id, playlistID):
    endpoint = "playlists/" + playlistID + "/tracks?fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref%2C)))&limit=10"
    return execute_spotify_api_request(session_id, endpoint)

def rename_playlist(session_id, playlistID, playlistName):
    tokens = get_user_tokens(session_id)
    endpoint = "playlists/" + playlistID
    data = '{"name":"' + playlistName + '","description": "By LifeOST", "public":true }'
    print(data)
    data = '{"name":"my_playlist", "description":"By LifeOST", "public":true }'
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token}
    return post(URL_STEM + endpoint, data=data, headers=headers)

def testAttributeFilter(email):
    attributes = Database.objects.values_list('attr', flat=True).filter(userEmail=email)

    return attributes


def findSongIDSpecificAttr(email, attribute):

        #Find the objects with the attribute
        user_song = Database.objects.filter(userEmail=email, location=attribute)
        #Print out those objects 
        print(user_song)

        #List the trackIDs with the location attribute
        songs = Database.objects.values_list('trackID', flat=True).filter(userEmail=email, location=attribute)
        print(songs)

        #List the trackIDs with the mood attribute
        #songs = Database.objects.values_list('trackID', flat=True).filter(userEmail=email, mood=attribute)
        #print(songs)

        #List the trackIDs with the mood attribute
        #songs = Database.objects.values_list('trackID', flat=True).filter(userEmail=email, activity=attribute)
        #print(songs)


def isLocation(attribute):
    locations = ['gym', 'school', 'work', 'home', 'beach']

    for x in locations: 
        if x == attribute:
            print(x)
            return True
        else: 
            return False

def isMood(attribute):
    moods = ['happy', 'sad', 'angry', 'soft', 'loud', 'sentimental', 'lonely', 'melancholy']

    for x in moods: 
        if x == attribute:
            print(x)
            return True
        else: 
            return False

def isActivity(attribute):
    activities = ['studying', 'cooking', 'sleeping', 'driving', 'walking', 'running', 'cleaning']

    for x in activities: 
        if x == attribute:
            print(x)
            return True
        else: 
            return False


def findAttributeCategory(attribute):

    location = isLocation(attribute)
    mood = isMood(attribute)
    activity = isActivity(attribute)

    if location:
        print("location")

    if mood:
        print("mood")

    if activity:
        print("activity")

    





    


