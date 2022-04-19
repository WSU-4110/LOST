from django.urls import path
from .views import DatabaseView, AttributesView

urlpatterns = [
    path('database', DatabaseView.as_view()),
    path('attributes', AttributesView.as_view())
]