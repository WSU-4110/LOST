from django.urls import path
from .views import DatabaseView, CustomAttributesView

urlpatterns = [
    path('database', DatabaseView.as_view()),
    path('custom-attributes', CustomAttributesView.as_view())
]