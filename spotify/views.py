from django.shortcuts import render, redirect

from spotify.serializers import userSerializer
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import generics, status
from rest_framework.response import Response
from .util import * 
from api.models import Home

# Create your views here.

#show all current users within database
class userView(generics.ListAPIView):
    queryset = SpotifyToken.objects.all()
    serializer_class = userSerializer

#Returns URL to authenticate spotify application 
class AuthURL(APIView):
    def get(self, request, fornat=None):
        # info we want to access in the app (need to add more scopes later)
        # find more scopes @ developer.spotify.com
        # https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        # URL to authorize account
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',    #Requesting the code to authenticate user
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url   #have front end get url 

        return Response({'url': url}, status=status.HTTP_200_OK)

#Send request to get access to all the tokens and send to the frontend 
def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    #create database to store all of the tokens and refresh tokens (new session needs new tokens and etc )

    #Check if there is a session key, if not, create 
    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:home')  #put in name of application (frontend:) after : put page to go to 

#Call util is_spotify_autneticated to see if user is authenticated 
#return the response 
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)


class logoutUser(APIView):
    def get(self, request, format=None):
        logout_button(self.request.session.session_key)
        return Response(status=status.HTTP_200_OK)

#recieves search string sent from frontend and calls util search using the search string
class spotifySearch(APIView):
    def get(self, request, format=None):
        #use this when search bar has been added and form data from frontend can be sent
        #searchInput = self.request.session.get('search')

        #testing input
        searchInput = 'the weeknd'
        results = search(self.request.session.session_key, searchInput)
        return Response(results, status=status.HTTP_200_OK)


#Get all info about current song 
# used for testing purposes 
class AllCurrentSongInfo(APIView):
    def get(self, request, format=None):
        
        endpoint = "me/player/currently-playing"
        response = execute_spotify_api_request(self.request.session.session_key, endpoint)

        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)


        return Response(response, status=status.HTTP_200_OK)



#Get current info about current song and return to Frontend 
class CurrentSong(APIView):
    def get(self, request, format=None):
        
        endpoint = "me/player/currently-playing"
        response = execute_spotify_api_request(self.request.session.session_key, endpoint)

        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')

        artist_string = "" #Handles if there are multiple artists for a song, cleans up for frontend 

        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name


        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'id': song_id
        }

        return Response(song, status=status.HTTP_200_OK)


    