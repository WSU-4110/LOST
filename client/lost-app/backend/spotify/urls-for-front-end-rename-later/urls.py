#will go into front end folder, need to reoganizne repo 
#ignore this for now 


from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    
]