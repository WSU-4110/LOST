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



# debug=true when developing
if __name__ == "__main__":
    app.run(debug=True)