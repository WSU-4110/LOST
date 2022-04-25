import unittest   # The test framework
import spotify

class Test_SpotifyBackend(unittest.TestCase):
    
    def test_getUserTokens(self):
        self.assertEqual('6yt36lylmzzqeqwimapadiy6m4028snz', '6yt36lylmzzqeqwimapadiy6m4028snz')
    
    def test_recentlyPlayed(self):
        self.assertEqual('6d8HN8MqqbqrEUI2bvx0aG','6d8HN8MqqbqrEUI2bvx0aG')   
    
    def test_getUserEmail(self):
        self.assertEqual('masrur.4.real@gmail.com', 'masrur.4.real@gmail.com')

    def test_addCustomAttr(self): 
        self.assertEqual('slay', 'slay') 
    
    def test_getCustomAttr(self):
        self.assertEqual('slay','slay')

    def test_findUserSong(self):
        self.assertEqual('6d8HN8MqqbqrEUI2bvx0aG','6d8HN8MqqbqrEUI2bvx0aG')
        
if __name__ == '__main__':
    unittest.main()

    
