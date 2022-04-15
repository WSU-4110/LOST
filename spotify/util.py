from .models import SpotifyToken
from api.models import Database
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


def storeSong(session_id, data, email, id):
    user_song = Database.objects.filter(userEmail=email, trackID=id)
    #print('user song in db (if exists): ' + user_song[0])

    #if song exist in db, return song information
    if user_song.exists():
        return user_song[0]
    else:
        #else store song in db and return information
        song = Database(userEmail=email, trackID=id, loudness=data, location=None, mood=None, activity=None, custom_attr1=None, custom_attr2=None, custom_attr3=None)
        song.save()
        user_song = Database.objects.filter(userEmail=email, trackID=id)
        return user_song[0]


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