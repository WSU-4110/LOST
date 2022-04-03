import React, { useEffect, useState} from 'react';
import Loading from './Loading';


const MusicPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  })
  if(isLoading){
    return(
      <Loading />
    );
  }
    return (
      <div className="mainContainer">
      <div className="nav">
        <div className="logo">
          <img src="https://i.imgur.com/NMLpcKj.jpeg" width={"5%"} alt="logo"/>
        </div>
      </div>
      <div className="bodyContainer">
        <div className="subContainer" id="player">
          {/* <Search></Search> */}
          <div className="album">
            <img width={"70%"} src="https://i.imgur.com/4HPKiov.jpeg" alt="album cover"/>
          
          </div>
        </div>
        <div className="subContainer">
          <h1>ATTRIBUTES</h1>
        </div>
        <div className="subContainer">
          <h1>ADD</h1>
          {/* <Search></Search> */}
        </div>
      </div>
        </div>
    )
}

export default MusicPage