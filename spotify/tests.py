from django.test import TestCase

# Create your tests here.
from unittest import result
from django.test import TestCase
from spotify.util import get_user_tokens, recentlyPlayed, getUserEmail, addCustomAttr, logout_button, findUserSong

# Create your tests here.

class Test_SpotifyBackend(TestCase):
    
    def test_getUserTokens(self):
        sessionId = '6yt36lylmzzqeqwimapadiy6m4028snz'
        user_token = get_user_tokens(sessionId)
        self.assertEqual(None, user_token)
    
    def test_recentlyPlayed(self):
        sessionID = '6yt36lylmzzqeqwimapadiy6m4028snz'
        self.assertEqual('6d8HN8MqqbqrEUI2bvx0aG', recentlyPlayed(sessionID))   
    
    def test_getUserEmail(self):
        sessionID = '1'
        result = getUserEmail(sessionID)
        self.assertEqual('masrur.4.real@gmail.com', result['userEmail'])

    def test_addCustomAttr(self): 
        email = 'cristina.powers@powerstribe.net'
        desc = 'slay'
        result = addCustomAttr(email, desc)
        self.assertEqual('slay', result['attr']) 

    def test_logoutButton(self):
        sessionID = '6yt36lylmzzqeqwimapadiy6m4028snz'
        self.assertEqual(None, logout_button(sessionID))

    def test_findUserSong(self):
        email = 'masrur.4.real@gmail.com' 
        id = '6d8HN8MqqbqrEUI2bvx0aG'
        result = findUserSong(email, id)
        self.assertEqual(None, result)

    def test_logoutButton(self):
        id = '6d8HN8MqqbqrEUI2bvx0aG'
        result = logout_button(id)
        self.assertEqual(None, result)
        

    
