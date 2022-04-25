from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('logout-user', logoutUser.as_view()),
    path('user', userView.as_view()),
    path('all-current-song-info', AllCurrentSongInfo.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('searchAPI', spotifySearch.as_view()),
    path('recent', recentTrack.as_view()),
    path('song2DB', sendtoDB.as_view()),
    path('rmvAttrFromSong', removeAttr.as_view()),
    path('getUserCustomAttr', getCstmAttr.as_view()),
    path('addAttribute2Song', addAttribute.as_view()),
    path('addCstm', addCstm.as_view()),
    path('finduserSong', findUsrSong.as_view()),
    path('clear', clrAttr.as_view()),
    path('playlists', Playlists.as_view()),
    path('create-playlist', CreatePlaylist.as_view()),
    path('playlist-info', MostRecentPlaylist.as_view()),
    path('add-to-playlist', AddToPlaylist.as_view()),
    path('get-playlist-tracks', PlaylistTracks.as_view()),
    path('rename-playlist', RenamePlaylist.as_view())
]
