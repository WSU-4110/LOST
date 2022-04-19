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

    //Display info on the home page 
    render() {
        return (
            <Grid container spacing={1} class="App">
                <Navigation></Navigation>
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


            </Grid>
        );
    }
}