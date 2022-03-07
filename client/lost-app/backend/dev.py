from flask import Flask, request, url_for, session, redirect
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, insert, select
#import spotipy
#from spotipy.oauth2 import SpotifyOAuth ignore for now

app = Flask(__name__)

# DEFINE THE DATABASE CREDENTIALS
user = 'root'
password = ''
host = 'localhost'
port = 3306
database = 'dbLost'

# PYTHON FUNCTION TO CONNECT TO THE MYSQL DATABASE AND
# RETURNS THE SQLACHEMY ENGINE OBJECT
def get_connection():
	return create_engine(
		url="mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
			user, password, host, port, database
		, echo = True)
	)

# Saving SQLAlchemy engine obj into engine var
engine = get_connection()

#app.route('/createAttribute')
#def create_attribute()

#app.route('/deleteAttribute')
#def delete_attribute()

#app.route('/attachAttribute/<token>')
#def attach_attributeToSong(token)

#app.route('/removeAttribute')
#def remove_attributeFromSong()

#app.route('/hasAttr')
#def has_Attribute()
#   return true or false

#app.route('/createPlaylist/<token>')
#def create_Playlist(token)
#   return redirect(request.referrer)

if __name__ == '__main__':
    meta = MetaData()
    meta.create_all(engine)
    
    #creates tbArtists variable that will be used to reference tbArtists table
    #inside of dbLost
    tbArtists = Table('tbArtists', meta, autoload=True, autoload_with=engine)

    #query to INSERT into tbArtists, the values 1231425 Doja Cat Pop
    query = insert(tbArtists).values(artistID='1231425', artistName='Doja Cat', genres='Pop')

    #connects to the database
    conn = engine.connect()

    #statement to execute query
    result = conn.execute(query)

    #another query created to do a SELECT statement from tbArtists
    query = select([tbArtists])

    #statement to execute query
    result = conn.execute(query)

    #fetchall() used to create a list of data retrieved from a SELECT call 
    result_set = result.fetchall()
    print(result_set)

    
try:
	# GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
	engine = get_connection()
	print(f"Connection to the {host} for user {user} created successfully.")
except Exception as ex:
	print("Connection could not be made due to the following error: \n", ex)


# ignore for now
# @app.route("http://localhost:3000")
# def testing():
#     return {"customer": ["Jayne", "Lisa", "Jon"]}


# debug=true when developing
if __name__ == "__main__":
    app.run(debug=False)