import './App.css';
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import Home from './Home';
import Error from './Error';
import Loading from './Loading';
import Search from './Search';
import Settings from './Settings';
import MusicPlayer from './MusicPlayer';
function App(){


  return (
    <div className="App">
      <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/Error"> Error</Link>
        <Link to="/MusicPlayer"> MusicPlayer</Link>
        <Link to="/Search"> Search</Link>
        <Link to="/Settings"> Settings</Link>
        
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} ></Route>
        <Route exact path="/Error" element={<Error />}> </Route>  
        <Route exact path="/Loading" element={<Loading />} ></Route>
        <Route exact path="/Settings" element={<Settings />}> </Route>  
        <Route exact path="/Search" element={<Search />} ></Route>
        <Route exact path="/MusicPlayer" element={<MusicPlayer />}> </Route>  
      </Routes>
    </Router>
      </div>    
  );
}  



export default App