from cgitb import lookup
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

#List of all users who authenticated
class DatabaseView(generics.ListAPIView):
    queryset = Database.objects.all()
    serializer_class = DatabaseSerializer

class AttributesView(generics.ListAPIView):
    queryset = Attributes.objects.all()
    serializer_class = AttributesSerializer

class CustomAttributesView(generics.ListAPIView):
    queryset = CustomAttributes.objects.all()
    serializer_class = CustomAttributesSerializer

class PlaylistsView(generics.ListAPIView):
    queryset = Playlists.objects.all()
    serializer_class = PlaylistSerializer




#Load Users HomePage 
"""
class CreateHomeView(APIView):
    serializer_class = CreateHomeSerializer

    #Check if current user has an active session 
    def post(self, request, format=None):

    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)"""







