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
    path('searchAPI', spotifySearch.as_view())
]
