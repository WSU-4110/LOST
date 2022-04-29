# Create your tests here.
from django.test import TestCase
from api.models import CustomAttributes, Database
from api.serializers import CustomAttributesSerializer, DatabaseSerializer
from spotify.util import *


# Create your tests here.
class utilTestCase(TestCase):
    
    def test_clearAttributesTest(self):
        print('\nrunning clear attributes test')

        #tests if all attributes been cleared from the user 'pytest' with track id 6667777
        user = Database(userEmail='pytest', trackID='666777', loudness='6.7734', location='Park', mood='happy', activity='sleep', custom_attr='crazy', custom_attrtwo='slay', custom_attrthree=None)
        user.save()

        user_song = clearAttributes('pytest', '666777')

        #check value of location attribute
        self.assertEquals(None, user_song['location'], 'testing location attribute')

        #check value of mood attribute
        self.assertEquals(None, user_song['mood'])

        #check value of activity attribute
        self.assertEquals(None, user_song['activity'])

        #check value of custom attribute 1
        self.assertEquals(None, user_song['custom_attr'])

        #check value of custom attribute 2
        self.assertEquals(None, user_song['custom_attrtwo'])

        #check value of custom attribute 3
        self.assertEquals(None, user_song['custom_attrthree'])

    def test_getcustomAttr(self):
        print('\nrunning get custom attributes test\n')

        #get attributes stored for user 'thereShouldbe0Attributes@gmail.com' which is 0
        actual = getCustomAttr('thereShouldbe0Attributes@gmail.com')
        
        self.assertEquals(0, actual.count())

    def test_addAttr(self):
        print('\nrunning add attribute test\n')

        user = Database(userEmail='pytest', trackID='666777', loudness='6.7734', location='Park', mood='happy', activity='sleep', custom_attr='crazy', custom_attrtwo='slay', custom_attrthree=None)
        user.save()
        
        #tests if 'CSC building' is added to location attribute for user pytest and track id 666777
        user_song = addAttr('location', 'CSC building', 'pytest', '666777') 
        self.assertEquals('CSC building', user_song['location'])

    def test_rmvAttr(self):
        print('\nrunning remove attribute test\n')


        user = Database(userEmail='pytest', trackID='666777', loudness='6.7734', location='Park', mood='happy', activity='sleep', custom_attr='crazy', custom_attrtwo='slay', custom_attrthree=None)
        user.save()
        
        #tests if 'mood' attribute was remove and set to none for user pytest and track id 666777
        user_song = rmvAttr('mood', 'pytest', '666777')
        self.assertEquals(None, user_song['mood'])

    def test_storeSong(self):
        print('\nrunning store song test\n')

        #stores trackid 888 for newUser into db and sets loudness to 8.93332
        user_song = storeSong(8.93332, 'newUser','888')

        self.assertEquals('newUser', user_song['userEmail'])

    def test_getsonginfo(self):
        print('\nrunning get song info test\n')

        #needs an actual session id from valid user that isnt expired, so the method should return an error and generate an exception
        with self.assertRaises(Exception):
            getSongInfo(2, '12312')
            
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
    
    # Masrur's test functions 
    def test_getUserTokens(self):
        sessionId = '6yt36lylmzzqeqwimapadiy6m4028snz'
        user_token = get_user_tokens(sessionId)
        self.assertEqual(None, user_token)

    def test_addCustomAttr(self): 
        email = 'cristina.powers@powerstribe.net'
        desc = 'slay'
        result = addCustomAttr(email, desc)
        self.assertEqual('slay', result['attr']) 

    def test_logoutButton(self):
        id = '6d8HN8MqqbqrEUI2bvx0aG'
        result = logout_button(id)
        self.assertEqual(None, result)
        
    def test_isSpotifyAuthenticated(self):
        id = '6d8HN8MqqbqrEUI2bvx0aG'
        result = is_spotify_authenticated(id)
        self.assertEqual(False, result)

    def test_isLocation(self):
        attribute = 'beach'
        result = isLocation(attribute)
        self.assertEqual(True, result)

    def test_isMood(self): 
        attribute = 'happy'
        result = isMood(attribute)
        self.assertEqual(True, result)
