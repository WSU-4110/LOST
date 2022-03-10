import '../styles/Attributes.css';
import React from 'react';


const Attributes = () => {
    
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
 
    return (
        <div style={{ backgroundColor: "#" + `${randomColor}` }} className="bubble">
            <h4 className="description">attribute 2</h4>
        </div>
    )
}

export default Attributes