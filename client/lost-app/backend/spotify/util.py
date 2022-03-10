from .models import SpotifyToken
from django.utils import timezone 
from datetime import timedelta

#Check if there is a token for a specific user 
def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    #if tokens exist, return token
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

#User Tokens expire in 1 hr 
#User tokens expire in 3600 seconds 
#Convert seconds into timestamp
#Want to store time the token expires 
#get current time and add hour to it and store in database 
#easy to check if token expired 
def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in) #converts seconds into timedelta and adds to timestamp

    #If token exists, update 
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type'])
    #If token doesnt exist, save to database 
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token, 
                              refresh_token=refresh_token, token_type=token_type)
        tokens.save()
