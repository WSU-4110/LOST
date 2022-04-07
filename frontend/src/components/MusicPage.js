import React, { useEffect, useState } from 'react';
import Loading from './Loading';


const MusicPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  })
  if (isLoading) {
    return (
      <Loading />
    );
  }

  const get_SearchResults = e => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchStr: e,
      }),
    };
    fetch("http://127.0.0.1:8000/spotify/searchAPI", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //to get a single item within the 'albums' list
        console.log(data['albums']['items'][0])

        //to get all items within the 'albums' list
        console.log(data['albums']['items'])

        //the same can be done with the tracks and artists lists
      });
  }


  return (
    <div className="mainContainer">
      <div className="nav">
        <div className="logo">
          <img src="https://i.imgur.com/NMLpcKj.jpeg" width={"5%"} alt="logo" />
        </div>
      </div>
      <div className="bodyContainer">
        <div className="subContainer" id="player">
          <div class="search">
            <input type="text" class="search-bar" placeholder="Search" onChange={e => get_SearchResults(e.target.value)} />
            <button><i class="material-icons">searchelp</i></button>
          </div>
          <div className="album">
            <img width={"70%"} src="https://i.imgur.com/4HPKiov.jpeg" alt="album cover" />

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
