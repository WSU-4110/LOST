import React, { useEffect, useState} from 'react';
import { Button, Grid, Typography, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import Settings from "./Settings";

const Navigation = () => {
  
    return (
      <>
        <div class='navBar'>
        <div className="logo" >
          <a href="/home" onclick="navigation.followPath('/home');">
            <img src="https://i.imgur.com/QVj3kkb.png" width={"100%"} alt="logo" />
          </a>
          
        </div>
        <div class='musicPlayerLink'>
            <Button color="secondary" class="songBtn" variant="contained" to="/home" component={Link}>
                HOME
            </Button>
            <Button color="secondary" class="songBtn" variant="contained" to="/music-player" component={Link}>
                SONGS
            </Button>
            <div class='menuIcon'>
            <Settings />
        </div>
        </div>

        </div>
      </>
    );
  }
  
  export default Navigation