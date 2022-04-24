from cgitb import lookup
from django.shortcuts import render, redirect

from spotify.serializers import userSerializer
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import generics, status
from rest_framework.response import Response
from .util import * 

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
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private'

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
    #name of value sent from body of POST request in frontend
    lookup_url_kwarg = 'searchStr'

    def post(self, request, format=None):
        #obtaining value sent from the body of POST request in frontend
        searchInput = request.data.get(self.lookup_url_kwarg)
        
        #print statement for debugging purposes
        print(searchInput)

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

#get recently played track by executing recentlyPlayed()
class recentTrack(APIView):
    def get(self, request, format=None):
        result = recentlyPlayed(self.request.session.session_key)
        return Response(result, status=status.HTTP_200_OK)

#stores song in database if not already in there
class sendtoDB(APIView):
    #name of value sent from body of POST request in frontend
    lookup_kwarg = 'song'

    def post(self, request, format=None):
        #obtaining value sent from the body of POST request in frontend
        songID = request.data.get(self.lookup_kwarg)

        songInfo = getSongInfo(self.request.session.session_key, songID)['loudness']

        email = getUserInfo(self.request.session.session_key)['email']

        results = storeSong(songInfo, email, songID)
        print(results)
        return Response(results, status=status.HTTP_200_OK)

#remove attr from song
class removeAttr(APIView):
    lookup_kwarg = 'type'
    lookup_kwarg2 = 'id'

    def post(self, request, format=None):
        #obtaining value sent from the body of POST request in frontend
        songID = request.data.get(self.lookup_kwarg2)

        email = getUserInfo(self.request.session.session_key)['email']

        attrType = request.data.get(self.lookup_kwarg)

        results = rmvAttr(attrType, email, songID)

        return Response(results, status=status.HTTP_200_OK)

#add attr to song
class addAttribute(APIView):
    lookup_kwarg = 'type'
    lookup_kwarg2 = 'desc'
    lookup_kwarg3 = 'id'

    def post(self, request, format=None):
        #obtaining value sent from the body of POST request in frontend
        songID = request.data.get(self.lookup_kwarg3)
        #print statement for debugging purposes

        email = getUserInfo(self.request.session.session_key)['email']

        attrType = request.data.get(self.lookup_kwarg)
        attrDesc = request.data.get(self.lookup_kwarg2)

        results = addAttr(attrType, attrDesc, email, songID)
        print(results)

        return Response(results, status=status.HTTP_200_OK)

#get user's custom attr's
class getCstmAttr(APIView):
    def get(self, requeset, format=None):        
        email = getUserInfo(self.request.session.session_key)['email']
        print(email)

        result = getCustomAttr(email)

        return Response(result, status=status.HTTP_200_OK)

#deprecated, keep for further analysis
class findUsrSong(APIView):
    lookup_kwarg = 'id'

    def post(self, request, format=None):
        #email = request.data.get(self.lookup_kwarg)        
        email = getUserInfo(self.request.session.session_key)['email']
        print(email)
        #obtaining value sent from the body of POST request in frontend
        songID = request.data.get(self.lookup_kwarg)
        #print statement for debugging purposes

        results = findUserSong(email, songID)

        return Response(results, status=status.HTTP_200_OK)

#remove all attr's from given song
class clrAttr(APIView):
    lookup_kwarg = 'id'

    def post(self, request, format=None):
        #obtaining value sent from the body of POST request in frontend
        songID = request.data.get(self.lookup_kwarg)
        #print statement for debugging purposes

        email = getUserInfo(self.request.session.session_key)['email']

        results = clearAttributes(email, songID)

        return Response(results, status=status.HTTP_200_OK)

class Playlists(APIView):
    def post(self, request, format=None):
        #me/playlists
        #me/playlists?limit=10&offset=5
        endpoint = "me/playlists?limit=10&offset=5"
        response = execute_spotify_api_request(self.request.session.session_key, endpoint)

        return Response(response, status=status.HTTP_200_OK)

class CreatePlaylist(APIView):
    def post(self, request, format=None):
        userID = getUserInfo(self.request.session.session_key)['id']
        print(userID)

        create_playlist(self.request.session.session_key, userID)

        return Response({}, status=status.HTTP_200_OK)
    
class MostRecentPlaylist(APIView):
    def get(self, request, format=None):
        #me/playlists
        #me/playlists?limit=10&offset=5
        # playlistID = get_playlist_name(self.request.session.session_key)['']
        endpoint = "me/playlists?limit=1&offset=0"
        response = execute_spotify_api_request(self.request.session.session_key, endpoint)

        item = response.get('items')[0]
        playlistID = item.get('id')
        playlistName = item.get('name')
        playlistHREF = item.get('href')
        userHREF = item.get('owner').get('href')
        userID = item.get('owner').get('id')

        playlist = {
            'name': playlistName,
            'id': playlistID,
            'href': playlistHREF,
            'userID': userID,
            'user_href': userHREF,
        }
        
        return Response(playlist, status=status.HTTP_200_OK)

class AddToPlaylist(APIView):
    def post(self, request, format=None):

        #all of playlist info playlistID 
        response = get_playlist_info(self.request.session.session_key)
        item = response.get('items')[0]
        playlistID = item.get('id')
        print(playlistID)

        trackID = "6EF9LmygQkNILmFVwYzxDr"

        add_track_to_playlist(self.request.session.session_key, playlistID, trackID)

        return Response({}, status=status.HTTP_200_OK)

class RenamePlaylist(APIView):
    def put(self, request, format=None):

        response = get_playlist_info(self.request.session.session_key)
        item = response.get('items')[0]
        playlistID = item.get('id')
        print(playlistID)

class PlaylistTracks(APIView):
    def get(self, request, format=None):

        response = get_playlist_info(self.request.session.session_key)
        item = response.get('items')[0]
        playlistID = item.get('id')
        print(playlistID)
        
        track_response = get_playlist_tracks(self.request.session.session_key, playlistID)

        return Response(track_response, status=status.HTTP_200_OK)










