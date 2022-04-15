import React, { Component } from 'react';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import Login from './Login';
import MusicPage from './MusicPage';
import { Link } from "react-router-dom";
import Settings from "./Settings";

//test commit for kylie

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyAuthenticated: false,
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.authenticateSpotify();
        this.playMusic = this.playMusic.bind(this);
        this.pauseMusic = this.pauseMusic.bind(this);
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

    playMusic() {
        document.getElementsByTagName("audio")[0].play();
    }

    pauseMusic() {
        document.getElementsByTagName("audio")[0].pause();
        //document.getElementsByTagName("audio")[0].currentTime = 0;
    }

    getPlayed() {
        fetch('/spotify/recent')
            .then((response) => response.json())
            .then((data) => {
                var parentT = document.getElementsByClassName("recentPlayed")[0];

                //styling done here, inside style=' . . . content here . . .'
                parentT.innerHTML = "<img src='" + data['items'][0]['track']['album']['images'][1]['url'] + "' style='height: 200px; width: 200px;'/>";

                var src = document.createElement("source");
                var attr = document.createAttribute("src");
                attr.value = data['items'][0]['track']['preview_url'];
                src.setAttributeNode(attr);
                attr = document.createAttribute("type");
                attr.value = "audio/mpeg";
                src.setAttributeNode(attr);
                document.getElementById("spotifyAud").appendChild(src)
            });
    }

    //Display info on the home page 
    render() {
        return (
            <Grid container spacing={1} class="App">
                <nav>
                    <div class='navBar'>

                        <div class='musicPlayerLink'>

                            <Button color="secondary" class="songBtn" variant="contained" to="/music-player" component={Link}>
                                SONGS
                            </Button>
                        </div>
                        <div class='menuIcon'>
                            <Settings />
                        </div>

                    </div>
                </nav>
                <div class="horizontalDisplay">
                    <h3 class="h2Align">Recently Played</h3>
                    <div class="recentPlayed">

                    </div>
                    <audio id="spotifyAud"></audio>
                    <Button onClick={this.playMusic}>Play</Button>
                    <Button onClick={this.pauseMusic}>Pause</Button>
                    <h3 class="h2Align">Recent Attributes</h3>
                    <div class="recentAttributes">
                        <div class="flexAttributes">

                        </div>
                    </div>
                </div>
                <div className="createSection">
                    <div className="leftSection">
                        <div className="createEffect">
                            <h1 className='create'>CREATE</h1>
                        </div>

                        <h3 >Saved Attributes</h3>
                        <div className="SavedAtrributes">

                        </div>

                    </div>
                    <div class="rightSection">

                    </div>
                </div>


            </Grid>
        );
    }
}