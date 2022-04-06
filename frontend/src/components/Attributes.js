import '../styles/Attributes.css';
import React from 'react';


const Create = () => {
    let width = 100;
    let height = auto;
    let Color = Math.floor(Math.random() * 16777215).toString(16);
    var title;
 
    return (
        <div style={{ backgroundColor: "#" + `${Color}` }} className="bubble">
            <h4 className="description">attribute 2</h4>
        </div>
    )
}

export default Create

const preDefined = () => {
    Create(this.definedAttributes);
}

const custom = () => {
    Create(this.userInput);
}