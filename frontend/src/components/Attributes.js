import React from 'react';


const Attributes = (attrType, attrName) => {
    var makeColorCode = '0123456789ABCDEF';
    var code = '#';
    for (var count = 0; count < 6; count++) {
        code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }



    return (
        "<div style='background-color: " + code + "' class='bubble'><h4 class=" + attrName + " id=" + attrType + ">" + attrName + "</h4></div>"
    )
}

export default Attributes