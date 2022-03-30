from django.urls import path
from .views import index 

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('song', index),
    path('home', index, name='home'),
    path('music-player', index),
    path('search', index),
    path('error', index),
    path('settings', index)
]
