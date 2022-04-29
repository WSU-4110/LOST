# Create your tests here.
from django.test import TestCase
from spotify.util import get_playlist_info, get_user_tokens, is_spotify_authenticated, addCustomAttr, logout_button, refresh_spotify_token

# Create your tests here.

class Test_SpotifyBackend(TestCase):
    
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

    def test_refreshSpotifyToken(self):
        id = '6d8HN8MqqbqrEUI2bvx0aG'
        result = refresh_spotify_token(id)
        self.assertAlmostEqual(None, result)
    
    # def test_getPlaylistInfo(self):
    #    id = '6d8HN8MqqbqrEUI2bvx0aG'
    #    result = get_playlist_info(id)
    #    self.assertEqual(None, result)