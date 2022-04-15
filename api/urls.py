from django.urls import path
from .views import DatabaseView

urlpatterns = [
    path('home', DatabaseView.as_view())
    #path('create-home', CreateHomeView.as_view()),
    #path('get-home', GetHome.as_view())
]