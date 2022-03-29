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

  

  
  if(isLoading){
    return(
      <Loading />
    );
  }
  return (
  <body>
    <div className="App">
      <div>
     
            <nav>
              <div className='navBar'>
                <div className='musicPlayerLink'>
                  <Link to="/MusicPlayer" className='linkStyle'> SONGS</Link>
                </div>
                <div className='menuIcon'>
                  <Settings/>
                </div>
              </div>
            </nav>
            </div>
            <div className="horizontalDisplay">
              <h3 className ="h2Align">Recently Played</h3>
                <div className= "recentPlayed">
                </div>
              <h3 className ="h2Align">Recent Attributes</h3>
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
                <Search></Search>
          
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