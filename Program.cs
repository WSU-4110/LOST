from api.serializers import CustomAttributesSerializer, DatabaseSerializer
from .models import SpotifyToken
from api.models import CustomAttributes, Database
from django.utils import timezone 
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get

// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
#url stem used for all api calls to spotify
URL_STEM = "https://api.spotify.com/v1/"

#Check if there is a token for a specific user 
def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    #if tokens exist, return token
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None pip