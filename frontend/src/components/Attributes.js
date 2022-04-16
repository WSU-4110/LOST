import React from 'react';


const Attributes = (attrType, attrName) => {

    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (
        "<div style='background-color: #" + randomColor + "' class='bubble'><h4 class=" + attrName + " id=" + attrType + ">" + attrName + "</h4></div>"

    )
}

export default Attributes