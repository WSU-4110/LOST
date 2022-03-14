import '../styles/App.css';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {
  Link,
} from "react-router-dom";

import Error from './Error';
import Loading from './Loading';
import Search from './Search';
import Settings from './Settings';
import MusicPlayer from './Song';
import Attributes from './Attributes';

function Home(){
const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  })
  const CLIENT_ID = "814c4cd6f699496faf7fb59dac61f66a"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([])

  useEffect( ()=> {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash){
      token = hash.substring(1).split("&").find(elem=> elem.startsWith("access_token")).split("=")[1]

      window.location.hash=""
      window.localStorage.setItem("token",token)
    }
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}
  if(isLoading){
    return(
      <Loading />
    );
  }
  return (
  <body>
    <div className="App">
      <div>
            <header className="App-header">
                <h1>Spotify React</h1>
            
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    :  <div>
                    <Link to="/">Home</Link>
                    <Link to="/Song"> Song</Link>
                    <Link to="/MusicPlayer"> MusicPlayer</Link>
                    <Link to="/Search"> Search</Link>
                    <Link to="/Settings"> Settings</Link>
                  <br></br>
                   <button onClick={logout}>Logout</button>
                    </div>
                    }

                {token ?
                    <div className="Search">
                      <form onSubmit={searchArtists}>
                          <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                          <button type={"submit"}>Search</button>
                          
                      </form>
                    </div>

                    : <h2>Please login</h2>
                }

                {renderArtists()}
                </header>
            <nav>
              <Link to="/MusicPlayer" className='linkStyle'> SONGS</Link>
              <Settings/>
            </nav>
            </div>
            <div className="horizontalDisplay">
              <h2 className ="h2Align">Recently Played</h2>
                <div className= "recentPlayed">
                </div>
              <h2 className ="h2Align">Recent Attributes</h2>
                <div className="recentAttributes">
                  <div className="flexAttributes">
                     <Attributes/>
                     <Attributes/>
                  </div>
                </div>
            </div>
            <div className="createSection">
              <div className="leftSection">
                <div className="createEffect">
                  <h1 className='create'>CREATE</h1>
                </div>
                {token ?
                    <div className="Search">
                      <form onSubmit={searchArtists}>
                          <input className="searchInput"type="text" onChange={e => setSearchKey(e.target.value)}/>
                          <button className = "searchButton" type={"submit"}><i class="fa fa-search"></i></button>
                         
                      </form>
                    </div>

                    : <h2>Please login</h2>
                }
          
                <h3 >Saved Attributes</h3>
                <div className="SavedAtrributes">

                </div>
                
              </div>
              <div className="rightSection">
              </div>
            </div>
           
        </div>
        </body>
  );
}  



export default Home