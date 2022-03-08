import React from 'react';
import '../Loading.css';
import {Audio} from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className="mystyle">
            <h1>Loading...</h1>
           <Audio color="#00BFFF" height={80} width={80} />
        </div>
    )
}

export default Loading