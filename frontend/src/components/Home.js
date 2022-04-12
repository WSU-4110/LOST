import React, { Component } from 'react';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import Login from './Login';
import MusicPage from './MusicPage';
import { Link } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotifyAuthenticated: false,
        };
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.authenticateSpotify();
    }

    /*
    // Get Details for the Users Home Page 
    getHomeDetails() {
        fetch('/api/get-home' + '?code=' + this.homeCode).then((response) => 
        response.json()
        ).then((data) => {
            this.setState({
                nightMode: data.night_mode,
                isUser: data.is_user,
            });
            this.authenticateSpotify();
        });
    }*/

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
    }

    //User logout
    logout() {
        fetch('/spotify/logout-user');
        window.open('https://www.spotify.com/us/logout/');
        setTimeout(function () {
            window.location.replace('http://localhost:8000/')
        }, 1000);
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
                            <Button color="secondary" class="btn-modal" variant="contained" to="/Settings" component={Link}>

                                <div class='menuBar'></div>
                                <div class='menuBar'></div>
                                <div class='menuBar'></div>

                            </Button>
                        </div>
                    </div>
                </nav>
                <div class="horizontalDisplay">
                    <h3 class="h2Align">Recently Played</h3>
                    <div class="recentPlayed">
                    </div>
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
                <div className="logoutSection">
                    <button onClick={logout}>
                        LOGOUT
                    </button>
                </div> 

            </Grid>
        );
    }
}