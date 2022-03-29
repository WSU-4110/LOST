# Takes all python related code and translates Room to json response 

from rest_framework import serializers 
from .models import Database, Home

# Take Home object and serialize it 
class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ('id', 'code', 'user', 'night_mode')

# Post request that gives information to the Home Page
class CreateHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ('night_mode',) 

class DatabaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Database
        fields = ('id', 'userEmail', 'trackID', 'loudness', 'location', 'mood', 'activity', 'custom1_attr1', 'custom_attr2', 'custom_attr3')
