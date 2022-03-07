import React from 'react';
import '../Loading.css';
import {Audio} from 'react-loader-spinner';

const Loading = () => {
    return (
        <div class = "mystyle">
           <Audio color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default Loading