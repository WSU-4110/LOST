from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# connecting to SQL database, database://root:pw format
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/databasenamegoeshere'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# database stored in db variable
db = SQLAlchemy(app)



@app.route("http://localhost:3000")
def testing():
    return {"customer": ["Jayne", "Lisa", "Jon"]}


# debug=true when developing
if __name__ == "__main__":
    app.run(debug=True)