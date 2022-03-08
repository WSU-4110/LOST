from django.shortcuts import render 
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.Response import Response

#Returns URL to authenticate spotify application 
class AuthURL(APIView):
    def get(self, request, fornat=None):
        # info we want to access in the app (need to add more scopes later)
        # find more scopes @ developer.spotify.com
        # https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        # URL to authorize account
        url = Request('GET', 'https://accounts.spotify.com/authorize', parama={
            'scope': scopes,
            'response_type': 'code',    #Requesting the code to authenticate user
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url   #have front end get url 

        return Response({'url': url}, status=status.HTTP_200_OK)



