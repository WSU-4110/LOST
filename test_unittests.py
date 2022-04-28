import unittest   # The test framework
from spotify.util import get_user_tokens, recentlyPlayed, getUserEmail, addCustomAttr, logout_button, findUserSong
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Lost.test_unittests")

class Test_SpotifyBackend(unittest.TestCase):
    
    def test_getUserTokens(self):
        sessionId = '6yt36lylmzzqeqwimapadiy6m4028snz'
        user_token = get_user_tokens(sessionId)
        self.assertEqual('6yt36lylmzzqeqwimapadiy6m4028snz', user_token)
    
    def test_recentlyPlayed(self):
        sessionID = '6yt36lylmzzqeqwimapadiy6m4028snz'
        self.assertEqual('6d8HN8MqqbqrEUI2bvx0aG', recentlyPlayed(sessionID))   
    
    def test_getUserEmail(self):
        sessionID = '6yt36lylmzzqeqwimapadiy6m4028snz'
        self.assertEqual('masrur.4.real@gmail.com', getUserEmail(sessionID))

    def test_addCustomAttr(self): 
        email = 'cristina.powers@powerstribe.net'
        desc = 'slay'
        self.assertEqual('slay', addCustomAttr(email, desc)) 

    def test_logoutButton(self):
        sessionID = '6yt36lylmzzqeqwimapadiy6m4028snz'
        self.assertEqual(None, logout_button(sessionID))

    def test_findUserSong(self):
        email = 'masrur.4.real@gmail.com'
        id = '6d8HN8MqqbqrEUI2bvx0aG'
        self.assertEqual('6d8HN8MqqbqrEUI2bvx0aG', findUserSong(email, id))
        
if __name__ == '__main__':
    unittest.main()

    
