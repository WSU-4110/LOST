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
        var table = document.getElementById("results");
        $("#results tr").remove();

        for (var i = 0; i < data['tracks']['items'].length; i++) {
          var row = table.insertRow();

          var song = row.insertCell(0);
          song.innerHTML = "<img src='" + data['tracks']['items'][i]['album']['images'][data['tracks']['items'][i]['album']['images'].length - 1]['url'] +
            "' style={{ height: '64px', width: '64px' }}/> <br>" + data['tracks']['items'][i]['name'];
          var artists = row.insertCell(1);
          var strArtists = "";
          for (var j = 0; j < data['tracks']['items'][i]['artists'].length; j++) {
            if (j != data['tracks']['items'][i]['artists'].length - 1) {
              strArtists += data['tracks']['items'][i]['artists'][j]['name'] + ", ";
            } else {
              strArtists += data['tracks']['items'][i]['artists'][j]['name'];
            }
          }
          artists.innerHTML = strArtists;
        }
        //to get a single item within the 'albums' list
        console.log(data['tracks']['items'].length);
        console.log(data['tracks']['total']);

        //to get all items within the 'albums' list
        console.log(data['tracks']['items']);

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
          <div className="subContainer">
            <table border="1" id="results">
            </table>
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
