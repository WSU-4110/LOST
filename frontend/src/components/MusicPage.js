import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import Navigation from "./Navigation";

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

  const fillColumn = (songInfo, display) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchStr: songInfo,
      }),
    };
    fetch("http://127.0.0.1:8000/spotify/searchAPI", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.dir(data);
        var parentT = document.getElementsByClassName("selectedSong")[0];
        //cover art, to style just edit the 'style' part of string
        parentT.innerHTML = "<img src='" + data['tracks']['items'][0]['album']['images'][1]['url'] + "' style='height: 200px; width: 200px;'/><br>" + display[0] + "<br>" + display[1];
        console.log(data['tracks']['items'][0]['id']);

        parentT.id = data['tracks']['items'][0]['id'];

        sendtoDB(data['tracks']['items'][0]['id']);
      });
  }

  const sendtoDB = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        song: id,
      }),
    };
    fetch("http://127.0.0.1:8000/spotify/song2DB", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
          var info;
          var display = [];
          info = row.getElementsByTagName("td")[1].innerHTML + " " + row.getElementsByTagName("td")[2].innerHTML;
          display[0] = row.getElementsByTagName("td")[1].innerHTML;
          display[1] = row.getElementsByTagName("td")[2].innerHTML;
          //console.log(rowInfo[0] + " " + rowInfo[1]);
          fillColumn(info, display);
          //alert("Song Name: " + rowInfo[0] + "\nArtist(s): " + rowInfo[1]);
        };
      };

      row.onclick = sendRowInfo(row);

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
    <Grid container spacing={1} class="App">
      <Navigation></Navigation>
      <div className="mainContainer">
        <div className="nav">
          <div className="logo" >
            <a href="/home" onclick="navigation.followPath('/home');">
              <img src="https://i.imgur.com/QVj3kkb.png" width={"5%"} alt="logo" />
            </a>

          </div>
        </div>
        <div className="bodyContainer">
          <div className="subContainer" id="player">
            <div class="search">
              <input type="text" class="search-bar" placeholder="Search" onChange={e => get_SearchResults(e.target.value)} />
            </div>
            <div class="scroll">
              <table id="results">
              </table>
            </div>
          </div>
          <div className="songPlayer">
            <div className="selectedSong"></div>
            <div className="flex">
            </div>
          </div>
          <div className="subContainer">
            <div className="translucent">
              <h1>Attributes</h1>
              <div className="Attributes" >

              </div>
            </div>
            <div className="translucent">
              <h1>Add</h1>
              <div className="Add">

              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>

  )
}

export default MusicPage
