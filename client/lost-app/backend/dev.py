from flask import Flask, request, url_for, session, redirect
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
#import spotipy
#from spotipy.oauth2 import SpotifyOAuth ignore for now

app = Flask(__name__)

# DEFINE THE DATABASE CREDENTIALS
user = 'root'
password = ''
host = 'localhost'
port = 3306
database = 'test'

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

if __name__ == '__main__':
    meta = MetaData()
    # creation of an example database for testing purposes
    students = Table(
    'students', meta, 
    Column('id', Integer, primary_key = True), 
    Column('name', String(20)), 
    Column('lastname', String(20)),
    )
    meta.create_all(engine)
    
    ins = students.insert()
    ins = students.insert().values(name = 'Ravi', lastname = 'Kapoor')
    conn = engine.connect()
    result = conn.execute(ins)
    
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
    app.run(debug=True)