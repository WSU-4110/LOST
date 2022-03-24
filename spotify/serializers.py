# Takes all python related code and translates Room to json response 

from rest_framework import serializers 
from .models import SpotifyToken

# Take SpotifyToken object and serialize it 
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyToken
        fields = ('id', 'user', 'created_at', 'refresh_token', 'access_token',
        'expires_in', 'token_type')

