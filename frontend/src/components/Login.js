import React, { Component } from 'react';
import { Grid, Button, ButtonGroup, Typography, CardMedia, createTheme } from "@material-ui/core";
import Home from './Home';
import SongPage from './SongPage';
import Settings from './Settings';
import MusicPage from './MusicPage';
import Search from './Search';
import Error from './Error';
import Loading from './Loading';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"


export default class Login extends Component {
    static defaultProps = {
        spotifyAuthenticated: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            spotifyAuthenticated: this.props.spotifyAuthenticated,
        };

        this.authenticateSpotify = this.authenticateSpotify.bind(this);
    }


    //Ask if current user is authenticated 
    //if user not authenticated => send user to spotify login page
    //else, redirect user to LOST homepage
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
                } else {
                    window.location.replace('/home');
                }
            });
    }

    
    renderLoginPage() {
        return (
            <div className="center">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12} align="center">
                    {/* DISPLAY HOUSE PARTY */}
                    <div className="login-text">
                        <Typography variant="h3" compact="h3">
                            LIFEOST
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} align="center">
                    {/* LOGIN BUTTON*/}
                    <Button color="secondary" variant="contained" onClick={this.authenticateSpotify} >
                        Login
                    </Button>
                </Grid>
            </Grid>
            </div>
        );
    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.renderLoginPage()}
                    </Route>
                    <Route path="/home" component={Home} />
                    <Route path="/song" component={SongPage} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/songs" component={MusicPage} />
                    <Route path="/search" component={Search} />
                    <Route path="/error" component={Error} />
                </Switch>
            </Router>
        );
    }
}