# LOST
## Reproduction
cd frontend and install the following

`npm install axios`

`npm install react-scripts --save`

`npm install react-loader-spinner --save`

`npm i webpack webpack-cli --save-dev `

`npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`

`npm i react react-dom --save-dev
`
`npm install @material-ui/core`

`npm install @babel/plugin-proposal-class-properties`

`npm install requests `

`npm install react-router-dom@5.2.0 `

`npm install @material-ui/icons`

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
# merge
git checkout main (switched to brain 'main')
git merge [Name of Branch]
