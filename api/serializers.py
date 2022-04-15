# Takes all python related code and translates Room to json response 

from rest_framework import serializers 
from .models import Database, Attributes

class DatabaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Database
        fields = ('userEmail', 'trackID', 'loudness', 'location', 'mood', 'activity', 'custom_attr', 'custom_attrtwo', 'custom_attrthree')

# Post request that gives information to Page that requested it
"""class CreateDatabaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Database
        fields = ('userEmail', 'trackID', 'loudness', 'location', 'mood', 'activity', 'custom1_attr1', 'custom_attr2', 'custom_attr3')"""

class Attributes(serializers.ModelSerializer):
    class Meta:
        model = Attributes
        fields = ('userEmail', 'attr')