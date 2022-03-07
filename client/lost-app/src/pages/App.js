
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
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