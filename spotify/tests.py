from django.test import TestCase
from api.models import CustomAttributes, Database
from api.serializers import CustomAttributesSerializer, DatabaseSerializer
from spotify.util import *

# Create your tests here.
class TestCases(TestCase):
    
    
    def test_create_playlist(self):
        print('\nCreate Playlist Test\n')
        
        #create_playlist takes in a valid, non expired, session id from user
            # assertRaises generates an exception so an error isnt triggered 
        with self.assertRaises(Exception):
            create_playlist(2, 'kellywhitlock', 'TestPlaylistName')

    def test_add_track_to_playlist(self):
        print('\nAdd Track to Playlist Test\n')

        #add_track_to_playlist takes in a valid, non expired, session id from user
            # assertRaises generates an exception so an error isnt triggered 
        with self.assertRaises(Exception):
            add_track_to_playlist(2, 'playlistID', '12312412')

    def test_get_playlist_tracks(self):
        print('\nGet Playlist Tracks Test\n')

        #get_playlist_tracks takes in a valid, non expired, session id from user
            # assertRaises generates an exception so an error isnt triggered 
        with self.assertRaises(Exception):
            get_playlist_tracks(2, '4B4jk7gQBOOSevCCMcUj3u')
       

    def test_findLocationSongs(self):
        print('\nFind Location Songs\n')

        # Get number of songs stored under the GYM location by User=testEmail  
        # Answer should be 0 
        song = findLocationSongs('testEmail', 'gym')

        self.assertEquals(0, song.count())

    def test_findActivitySongs(self):
         print('\nFind Activity Songs\n')
        
        # Get number of songs stored under the RUNNING activity by User=testEmail  
        # Answer should be 0 
         song = findActivitySongs('testEmail', 'running')

         self.assertEquals(0, song.count())

    def test_findMoodSongs(self):
         print('\nFind Mood Songs\n')

        # Get number of songs stored under the Happy mood by User=testEmail  
        # Answer should be 0 
         song = findActivitySongs('testEmail', 'happy')

         self.assertEquals(0, song.count())

        