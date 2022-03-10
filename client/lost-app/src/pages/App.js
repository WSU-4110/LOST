
import '../styles/App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../pages/Home';
import Error from '../pages/Error';
import Loading from '../pages/Loading';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import MusicPlayer from '../pages/MusicPlayer';
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