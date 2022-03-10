from urllib import request
from flask import Flask, jsonify, request, json, url_for, session, redirect
from flask_cors import CORS, cross_origin
from sqlalchemy import *
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import json
import time

app = Flask(__name__)

app.secret_key = 'holder'
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'

#ignore
#CORS(app, supports_credentials=True, resources={r"/access": {'origins':'http://localhost:3000'}})

#object to hold oauth info
def create_spotify_oauth():
    return SpotifyOAuth(
            client_id="814c4cd6f699496faf7fb59dac61f66a",
            client_secret="868a316526dc4d11935f6810b3e54c8d",
            redirect_uri=url_for('authorize', _external=True),
            scope="user-library-read")

#creates authorization link for spotify
@app.route('/')
def login():
    oauth = create_spotify_oauth()
    auth_url = oauth.get_authorize_url()
    print(auth_url)
    return redirect(auth_url)

@app.route('/authorize')
def authorize():
    oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = oauth.get_access_token(code)
    session["token_info"] = token_info

    #after token has been obtained, redirect user to homepage of Lost
    return redirect("http://localhost:3000/")


@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    #after token has been removed from session, redirect user to homepage of Lost
    return redirect('http://localhost:3000')


# Checks to see if token is valid and gets a new token if not
@app.route('/getnewToken')
def get_token():
    token_valid = False
    token_info = session.get("token_info", {})
    
    # Checking if the session already has a token stored
    if not (session.get('token_info', False)):
        token_valid = False
        return token_info, token_valid

    # Checking if token has expired
    now = int(time.time())
    is_token_expired = session.get('token_info').get('expires_at') - now < 60

    # Refreshing token if it has expired
    if (is_token_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(session.get('token_info').get('refresh_token'))

    token_valid = True
    return token_info, token_valid


#testing function for sending token info to front end
@app.route('/tokenStatus')
def getStatus():
    session['token_info'], authorized = get_token()
    session.modified = True
    if authorized:
        if session.get('token_info').get('expires_at') - int(time.time()) < 60:
            return 'token expired'
        return 'true'
    return 'false'

# just using this function to test the spotify call
@app.route('/getTracks')
def get_tracks():
    session['token_info'], authorized = get_token()
    session.modified = True
    if not authorized:
        return redirect('/')
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
    results = []
    iter = 0
    while iter != 10:
        curGroup = sp.current_user_saved_tracks(limit=10, offset=iter)['items'][0]['track']['name']
        results.append(curGroup)
        iter += 1

    for x in results:
        print(x)
    return jsonify(results)


# debug=true when developing
if __name__ == "__main__":
    app.run(debug=True)