# Takes all python related code and translates Room to json response 

from rest_framework import serializers 
from .models import *

class DatabaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Database
        fields = ('userEmail', 'trackID', 'loudness', 'location', 'mood', 'activity', 'custom_attr', 'custom_attrtwo', 'custom_attrthree')

# Post request that gives information to Page that requested it
"""class CreateDatabaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Database
        fields = ('userEmail', 'trackID', 'loudness', 'location', 'mood', 'activity', 'custom1_attr1', 'custom_attr2', 'custom_attr3')"""

class AttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attributes
        fields = ('userEmail', 'attr')

class CustomAttributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomAttributes
        fields = ('userEmail', 'attr')

class PlaylistSerializer(serializers.ModelSerializer):
        model = Playlists
        fields = ('userEmail', 'userID', 'playlistID',  'attr', 'trackID_1', 'trackID_2', 'trackID_3', 'trackID_4', 'trackID_5', 'trackID_6', 'trackID_7, trackID_8', 'trackID_9', 'trackID_10')