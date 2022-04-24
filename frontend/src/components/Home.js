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

    createPlaylist() {
        const requestOptions = {
            method: "POST",
            data: {
                "name": "my_playlist",
                "description": "description",
                "public": true,
            },
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/create-playlist", requestOptions);
        this.getPlaylistName();
        this.addToPlaylist();
    }

    addToPlaylist() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/add-to-playlist", requestOptions);
    }

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

    renamePlaylist(new_name) {
        const requestOptions = {
            method: "PUT",
            body: {
                "name": new_name,
                "description": "description",
                "public": true,
            },
            headers: { "Content-Type": "application/json" },
        };
        fetch("/spotify/rename-playlist", requestOptions);
    }

    displayPlaylistTracks() {
        fetch("/spotify/get-playlist-tracks")
            .then((response) => response.json())
            .then((data) => {
                var parentT = document.getElementsByClassName("rightSection")[0];

                console.log(data);
                console.log(data['items'][0]['track']['name']);
                //PRINT OUT SONG NAMES 
                parentT.innerHTML = data['items'][0]['track']['name'] + "<br><br>" + data['items'][1]['track']['name'] + "<br><br>" + data['items'][2]['track']['name'] + "<br><br>" + data['items'][3]['track']['name'] + "<br><br>" + data['items'][4]['track']['name'] + "<br><br>" + data['items'][5]['track']['name'] + "<br><br>" + data['items'][6]['track']['name'] + "<br><br>" + data['items'][7]['track']['name'] + "<br><br>" + data['items'][8]['track']['name'] + "<br><br>" + data['items'][9]['track']['name'];
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
                   <div class ="attributeSection"> <h3 class="h2Align">Recent Attributes</h3>
                    <div class="recentAttributes">
                        <div class="flexAttributes">

                        </div>
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

                        </div>

                    </div>
                    
                    <div class="rightSection">
                        

                    </div>

                    <Button onClick={() => {this.displayPlaylistTracks()}}>display tracks </Button>
                </div>
            </div>

            </Grid>
        );
    }
}