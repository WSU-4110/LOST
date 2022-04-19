import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import Navigation from "./Navigation";
import Attributes from "./Attributes";

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
        parentT.innerHTML = "<img src='" + data['tracks']['items'][0]['album']['images'][1]['url'] + "' style='height: 200px; width: 200px;'/><br>" + display[0] + "<br>" + display[1] + "<br><audio src='" + data['tracks']['items'][0]['preview_url'] + "' controls>";

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
        middleColumnAttr(data);
        loadAvailableAttributes(data);
      });
  }

  const refreshCols = (songData) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: songData['userEmail'],
        id: songData['trackID'],
      }),
    };
    fetch("http://127.0.0.1:8000/spotify/finduserSong", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('refresh cols function');
        middleColumnAttr(data);
        loadAvailableAttributes(data);
      });
  }

  const middleColumnAttr = (songData) => {
    var htmlBody = "";
    var parentT = document.getElementsByClassName("songAttrHolder")[0];

    $("#songAttrHolder div").empty();

    htmlBody += Attributes('Clear', 'Clear Attributes');

    if (typeof songData['location'] != "object") {
      htmlBody += Attributes('location', songData['location']);
    }

    if (typeof songData['mood'] != "object") {
      htmlBody += Attributes('mood', songData['mood']);
    }

    if (typeof songData['activity'] != "object") {
      htmlBody += Attributes('activity', songData['activity']);
    }

    if (typeof songData['custom_attr'] != "object") {
      htmlBody += Attributes('custom_attr', songData['custom_attr']);
    }

    if (typeof songData['custom_attrtwo'] != "object") {
      htmlBody += Attributes('custom_attrtwo', songData['custom_attrtwo']);
    }

    if (typeof songData['custom_attrthree'] != "object") {
      htmlBody += Attributes('custom_attrthree', songData['custom_attrthree']);
    }

    parentT.innerHTML = htmlBody;

    var removeAttr = function (attrBubble) {
      return function () {
        var attrType = attrBubble.id;
        console.log("remove function att type: " + attrType);

        var songID = document.getElementsByClassName("selectedSong")[0].id;
        console.log('id: ' + songID);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: attrType,
            id: songID,
          }),
        };
        fetch("http://127.0.0.1:8000/spotify/rmvAttrFromSong", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            //refreshCols(songID);
            sendtoDB(songID);
          });
      };
    };

    var clearAttr = function () {
      return function () {
        var songID = document.getElementsByClassName("selectedSong")[0].id;

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: songID,
          }),
        };
        fetch("http://127.0.0.1:8000/spotify/clear", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log('clear function used');
            console.log(data);
            sendtoDB(songID);
          });
      };
    };

    var clearBubble = document.getElementById("Clear");
    clearBubble.onclick = clearAttr();

    if (typeof songData['location'] != "object") {
      var bubbleAttr = document.getElementById("location");
      bubbleAttr.onclick = removeAttr(bubbleAttr);
    }

    if (typeof songData['mood'] != "object") {
      bubbleAttr = document.getElementById("mood");
      bubbleAttr.onclick = removeAttr(bubbleAttr);
    }

    if (typeof songData['activity'] != "object") {
      bubbleAttr = document.getElementById("activity");
      bubbleAttr.onclick = removeAttr(bubbleAttr);
    }

    if (typeof songData['custom_attr'] != "object") {
      bubbleAttr = document.getElementById("custom_attr");
      bubbleAttr.onclick = removeAttr(bubbleAttr);
    }

    if (typeof songData['custom_attrtwo'] != "object") {
      bubbleAttr = document.getElementById("custom_attrtwo");
      bubbleAttr.onclick = removeAttr(bubbleAttr);
    }

    if (typeof songData['custom_attrthree'] != "object") {
      bubbleAttr = document.getElementById("custom_attrthree");
      bubbleAttr.onclick = removeAttr(bubbleAttr);
    }
  }

  const loadAvailableAttributes = (songData) => {
    var parentT = document.getElementsByClassName("Attributes")[0];
    $("#Attributes div").empty();

    var htmlBody = "";

    var locations = ['gym', 'school', 'work', 'home', 'beach'];
    var moods = ['happy', 'sad', 'angry', 'soft', 'loud', 'sentimental', 'lonely', 'melancholy'];
    var activities = ['studying', 'cooking', 'sleeping', 'driving', 'walking', 'running', 'cleaning'];

    if (typeof songData['location'] == "object") {
      for (var i = 0; i < locations.length; i++) {
        htmlBody += Attributes('location', locations[i]);
      }
    }

    if (typeof songData['mood'] == "object") {
      for (var i = 0; i < moods.length; i++) {
        htmlBody += Attributes('mood', moods[i]);
      }
    }

    if (typeof songData['activity'] == "object") {
      for (var i = 0; i < activities.length; i++) {
        htmlBody += Attributes('activity', activities[i]);
      }
    }

    var customAttr = [];

    if (typeof songData['custom_attr'] == "object" || typeof songData['custom_attrtwo'] == "object" || typeof songData['custom_attr'] == "object") {
      if (customAttr.length != 0) {
        fetch("http://127.0.0.1:8000/spotify/getUserCustomAttr")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (typeof songData['custom_attr'] != "object") {
              for (var i = 0; i < customAttr.length; i++) {
                htmlBody += Attributes('custom_attr', customAttr[i]);
              }
            } else if (typeof songData['custom_attrtwo'] != "object") {
              for (var i = 0; i < customAttr.length; i++) {
                htmlBody += Attributes('custom_attrtwo', customAttr[i]);
              }
            } else {
              for (var i = 0; i < customAttr.length; i++) {
                htmlBody += Attributes('custom_attrthree', customAttr[i]);
              }
            }
          });
      }
    }

    parentT.innerHTML = htmlBody;

    //make onlcick functions here
    var addAttr = function (tag) {
      return function () {
        var attrType = tag.id;
        console.log("add type: " + attrType);
        var attrDesc = tag.className;
        console.log("add desc: " + attrDesc);
        var songID = document.getElementsByClassName("selectedSong")[0].id;
        console.log('id: ' + songID);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: attrType,
            desc: attrDesc,
            id: songID,
          }),
        };
        fetch("http://127.0.0.1:8000/spotify/addAttribute2Song", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            sendtoDB(songID);
          });
      };
    };

    var attrBubble;

    if (typeof songData['location'] == "object") {
      for (var i = 0; i < locations.length; i++) {
        attrBubble = document.getElementsByClassName(locations[i])[0];
        attrBubble.onclick = addAttr(attrBubble);
      }
    }

    if (typeof songData['mood'] == "object") {
      for (var i = 0; i < moods.length; i++) {
        attrBubble = document.getElementsByClassName(moods[i])[0];
        attrBubble.onclick = addAttr(attrBubble);
      }
    }

    if (typeof songData['activity'] == "object") {
      for (var i = 0; i < activities.length; i++) {
        attrBubble = document.getElementsByClassName(activities[i])[0];
        attrBubble.onclick = addAttr(attrBubble);
      }
    }
  }

  const fillTable = (data) => {
    var table = document.getElementById("results");
    $("#results tr").remove();

    for (var i = 0; i < data['tracks']['items'].length; i++) {
      var row = table.insertRow();
      row.style.cssText = "cursor: pointer;";

      var sendRowInfo = function (row) {
        return function () {
          var info;
          var display = [];
          info = row.getElementsByTagName("td")[1].innerHTML + " " + row.getElementsByTagName("td")[2].innerHTML;
          display[0] = row.getElementsByTagName("td")[1].innerHTML;
          display[1] = row.getElementsByTagName("td")[2].innerHTML;
          fillColumn(info, display);
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
            <audio className="songAud" id="spotifyAud"></audio>
            <div className="songAttrHolder" id="songAttrHolder"></div>
            <div className="flex"></div>
          </div>
          <div className="subContainer">
            <div className="translucent" id="AttributesID">
              <h1>Attributes</h1>
              <div className="Attributes"></div>
            </div>
            <div className="translucent">
              <h1>Add</h1>
              <div className="Add">
                <div class="search">
                  <input type="text" class="search-bar" placeholder="Search" />
                  <button>+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>

  )
}

export default MusicPage
