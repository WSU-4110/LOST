import React, { Component } from 'react';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import Navigation from "./Navigation";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyAuthenticated: false,
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.authenticateSpotify();
    }


    //Ask if current user is authenticated 
    authenticateSpotify() {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ spotifyAuthenticated: data.status })
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((data) => {
                            window.location.replace(data.url);
                        });
                }
            });
        this.getPlayed();
    }

    //User logout
    logout() {
        fetch('/spotify/logout-user');
        window.open('https://www.spotify.com/us/logout/');
        setTimeout(function () {
            window.location.replace('http://localhost:8000/')
        }, 1000);
    }

    getPlayed() {
        fetch('/spotify/recent')
            .then((response) => response.json())
            .then((data) => {
                var parentT = document.getElementsByClassName("recentPlayed")[0];

                var strArtists = "";

                for (var i = 0; i < data['items'][0]['track']['artists'].length; i++) {
                    if (i != data['items'][0]['track']['artists'].length - 1) {
                        strArtists += data['items'][0]['track']['artists'][i]['name'] + ", ";
                    } else {
                        strArtists += data['items'][0]['track']['artists'][i]['name'];
                    }
                }

                console.log(data);

                //styling done here, inside style=' . . . content here . . .'
                parentT.innerHTML = "<img src='" + data['items'][0]['track']['album']['images'][1]['url'] + "' style='height: 200px; width: 200px;'/><p id='songInfo'>" + data['items'][0]['track']['name'] + "<br>" + strArtists + "</p>";
            });
    }

    createPlaylist(attr) {
        console.log(attr);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: attr,
              description: "By LifeOST",
              public: true,
            }),
          };
          fetch("http://127.0.0.1:8000/spotify/create-playlist", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              this.getPlaylistName();
              this.displayPlaylistTracks();
            });
    }

    /*addToPlaylist(attr) {
        console.log(attr);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: attr,
              description: "By LifeOST",
              public: true,
            }),
        };
        fetch("http://127.0.0.1:8000/spotify/add-to-playlist", requestOptions);
    }*/

    //Display Playlist name when created 
    getPlaylistName(){
        fetch("/spotify/playlist-info")
            .then((response) => response.json())
            .then((data) => {
                var parentT = document.getElementsByClassName("Created-Playlist-Name")[0];

                console.log(data);

                //styling done here, inside style=' . . . content here . . .'
                parentT.innerHTML = data['name'];
            });
    }

    renamePlaylist(attr) {
        console.log(attr);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: attr,
              description: "By LifeOST",
              public: true,
            }),
          };
          fetch("http://127.0.0.1:8000/spotify/rename-playlist", requestOptions)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            });
    }

    displayPlaylistTracks() {
        fetch("/spotify/get-playlist-tracks")
            .then((response) => response.json())
            .then((data) => {
                var parentT = document.getElementsByClassName("rightSection")[0];

                console.log(data);
                console.log(data['items'][0]['track']['name']);
                //PRINT OUT SONG NAMES 
                parentT.innerHTML =  data['items'][0]['track']['name'] + "<br><br>" + data['items'][1]['track']['name'] + "<br><br>" + data['items'][2]['track']['name'] + "<br><br>" + data['items'][3]['track']['name'] + "<br><br>" + data['items'][4]['track']['name'] + "<br><br>" + data['items'][5]['track']['name'] + "<br><br>" + data['items'][6]['track']['name'] + "<br><br>" + data['items'][7]['track']['name'] + "<br><br>" + data['items'][8]['track']['name'] + "<br><br>" + data['items'][9]['track']['name'];
            });
    }

    //Display info on the home page 
    //<Button onClick={() => {this.createPlaylist()}}>create playlist </Button>
    render() {
        return (
            <Grid container spacing={1} class="App">
                <div class = "scrollGone">
                <Navigation></Navigation>
                <div class="horizontalDisplay">
                    <h3 class="h2Align">Recently Played</h3>
                    <div class="recentPlayed">

                    </div>
                    <div class="attributeSection"> 
                    <h3 class="h2Align">Recent Attributes</h3>
                        <div class="recentAttributes"> 
                            <div style={{backgroundColor: "#FB268B"}}class="bubble"><h4>Angry</h4></div> 
                            <div style={{backgroundColor: "#E43146"}} class='bubble'><h4>School</h4></div>
                            <div style={{backgroundColor: "green"}} class='bubble'><h4>Happy</h4></div>
                            <div style={{backgroundColor: "#ffcc00"}} class='bubble'><h4>Work</h4></div>
                            <div style={{backgroundColor: "purple"}} class='bubble'><h4>Walking</h4></div> 
                        </div>
                    </div>
                </div>
               
                <div className="createSection">
                    <div className="leftSection">
                        <div className="createEffect">
                            
                        </div>
                        <Button onClick={() => {this.createPlaylist()}}>create playlist </Button>
                        <div class="Created-Playlist-Name">

                        </div>
                        <h3 >Saved Attributes</h3>
                        <div className="SavedAtrributes">
                            <div style={{backgroundColor: "purple"}} class="bubble"><Button style={{color:"white"}} onClick={() => {this.createPlaylist("Gym")}} >Gym </Button></div>
                            <div style={{backgroundColor: "#F4677B"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("School")}} >School </Button></div>
                            <div style={{backgroundColor: "#02BD29"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Work")}} >Work </Button> </div>
                            <div style={{backgroundColor: "#F4A49B"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Home")}} >Home </Button></div>
                            <div style={{backgroundColor: "#2B630E"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Beach")}} >Beach </Button></div>
                            <div style={{backgroundColor: "#5B4DFD"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Happy")}} >Happy </Button></div>
                            <div style={{backgroundColor: "#EA9737"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Sad")}} >Sad </Button></div>
                            <div style={{backgroundColor: "#BE2D9B"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Angry")}} >Angry </Button></div>
                            <div style={{backgroundColor: "red"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Soft")}} >Soft </Button></div>
                            <div style={{backgroundColor: "#6B4F19"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Loud")}} >Loud </Button></div>
                            <div style={{backgroundColor: "#7AC3B8"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Sentimental")}} >Sentimental </Button></div>
                            <div style={{backgroundColor: "#ED96D4"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Lonely")}} >Lonely </Button></div>
                            <div style={{backgroundColor: "#27A9FE"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Melancholy")}} >Melancholy </Button></div>
                            <div style={{backgroundColor: "#DB7986"}} className='bubble'><Button style={{color:"white"}} onClick={() => {this.createPlaylist("Studying")}} >Studying </Button></div>
                            <div style={{backgroundColor: "#56444A"}} className='bubble'><Button style={{color:"white"}} onClick={() => {this.createPlaylist("Cooking")}} >Cooking </Button></div>
                            <div style={{backgroundColor: "#AAB3F3"}} className='bubble'><Button style={{color:"white"}} onClick={() => {this.createPlaylist("Sleeping")}} >Sleeping </Button></div>
                            <div style={{backgroundColor: "#E84200"}} className='bubble'><Button style={{color:"white"}} onClick={() => {this.createPlaylist("Driving")}} >Driving </Button></div>
                            <div style={{backgroundColor: "#EF4ECD"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Walking")}} >Walking </Button></div>
                            <div style={{backgroundColor: "#832CDA"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Running")}} >Running </Button></div>
                            <div style={{backgroundColor: "#20BC69"}} className='bubble'><Button style={{color:"white"}}  onClick={() => {this.createPlaylist("Cleaning")}} >Cleaning </Button></div>


                        </div>

                    </div>
                    
                    <div class="rightSection">
                        

                    </div>

                </div>
            </div>

            </Grid>
        );
    }
}