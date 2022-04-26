# LOST

## Navigation
### `LOST`- Our main project folder/settings 
* `__init__.py` - Makes LOST a python package 
* `asgi.py` - ASGI config for LOST project.
* `settings.py` - LOST project settings and installed apps
* `urls.py` - URLs for our main project 
*  `wsgi.py` - WSGI config for LOST project
### `api` - Django API application folder 
* `__init__.py` - Makes API a python package 
* `admin.py`
* `apps.py`
* `models.py` - Where API database models go 
* `serializers.py`
* `tests.py` - Used to test views or models 
* `urls.py` - API urls 
* `views.py` - Code responsible for rendering our API endpoints
### `frontend`
* `migrations`
* `src` 
* `components` folder holds all React page components 
* `static` folder holds anything the browser would cache 
  * `css`
    * `index.css` 
  *  `frontend` - Stores the main javascript bundle
* `templates/frontend` 
* `Babel.config.json` - Reroutes the pages so you can go to different pages from the React app 
* `webpack.config.js` - Bundles all of our Javascript files into one file 
### `spotify`
## About LOST
### Contributors
* Kylie Lee, Anthony Jones, Cristina Powers, Kelly Whitlock, Masrur Tajwar
### Purpose
* to provide users with customized Spotify playlists that fit their needs
### Functionalities
* generate a playlist based on attributes added to songs
* attach attributes to a song based on location, mood, activity
