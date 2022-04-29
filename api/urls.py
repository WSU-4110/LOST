from django.urls import path
from .views import *

urlpatterns = [
    path('database', DatabaseView.as_view()),
    path('attributes', AttributesView.as_view()),
    path('custom-attributes', CustomAttributesView.as_view()),
    path('playlists', PlaylistsView.as_view()),
]