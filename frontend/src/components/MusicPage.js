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
        fillTable(data);
      });
  }

  const fillTable = (data) => {
    var table = document.getElementById("results");
    $("#results tr").remove();

    for (var i = 0; i < data['tracks']['items'].length; i++) {
      var row = table.insertRow();
      row.style.cssText = "cursor: pointer;";

      //save for later, needed for rest of webpage functionality
      var sendRowInfo = function (row) {
        return function () {
          var rowInfo = [];
          rowInfo[0] = row.getElementsByTagName("td")[1].innerHTML;
          rowInfo[1] = row.getElementsByTagName("td")[2].innerHTML;
          alert("Song Name: " + rowInfo[0] + "\nArtist(s): " + rowInfo[1]);
        };
      };

      row.onclick = sendRowInfo(row);

      //styling to img can be added inside the song.innerHTML string
      var song = row.insertCell(0);
      song.innerHTML = "<img src='" + data['tracks']['items'][i]['album']['images'][data['tracks']['items'][i]['album']['images'].length - 1]['url'] +
        "'/>";

      var songName = row.insertCell(1);
      songName.innerHTML = data['tracks']['items'][i]['name'];

      var artists = row.insertCell(2);
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
  }

  return (
    <div className="mainContainer">
      <div className="nav">
<<<<<<< Updated upstream
        <div className="logo">
          <img src="https://i.imgur.com/ILJ5T9G.png" width={"5%"} alt="logo" />
=======
        <div className="logo" >
          <a href="/home" onclick="navigation.followPath('/home');">
            <img src="https://i.imgur.com/QVj3kkb.png" width={"5%"} alt="logo" />
          </a>
>>>>>>> Stashed changes
        </div>
      </div>
      <div className="bodyContainer">
        <div className="subContainer" id="player">
          <div class="search">
            <input type="text" class="search-bar" placeholder="Search" onChange={e => get_SearchResults(e.target.value)} />
          </div>
          <div className="subContainer">
            <table id="results">
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
