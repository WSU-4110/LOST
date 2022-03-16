import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Search } from '../components/Search';
import '../styles/MusicPlayer.css';


const MusicPlayer = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1500);
  // })
  // if(isLoading){
  //   return(
  //     <Loading />
  //   );
  // }

  const [data, setData] = useState([{}])
  useEffect(() => {
    fetch("http://localhost:3000/testing123").then(
      res=> res.json()
    ).then(
      data => {
        setData(JSON.parse(data))
        console.log(data)

      }
    )
  }, [])

    return (
        <div className="mainContainer">
          <div className="nav">
            <div className="logo">
              <img src="https://i.imgur.com/NMLpcKj.jpeg" alt="logo"/>
            </div>
          </div>
          <div className="bodyContainer">
            <div className="subContainer" id="player">
              <Search></Search>
              <div className="album">
                <img width={"70%"} src="https://i.imgur.com/4HPKiov.jpeg" alt="album cover"/>
              
              </div>
            </div>
            <div className="subContainer">
              <h1>ATTRIBUTES</h1>
            </div>
            <div className="subContainer">
              <h1>ADD</h1>
              <Search></Search>
            </div>
          </div>

          {/* <div className="test">
          {(typeof data.members === 'undefined') ? (
            <p>Loading...</p>
          ) : (
            data.members.map((member, i) => (
              <p key ={i}>{member}</p>
            ))
          )}
        </div> */}
        

        </div>
        
    )
}

export default MusicPlayer