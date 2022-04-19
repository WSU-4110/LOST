import React from 'react';


const Attributes = () => {
    var makeColorCode = '0123456789ABCDEF';
      var code = '#';
      for (var count = 0; count < 6; count++) {
         code =code+ makeColorCode[Math.floor(Math.random() * 16)];
      }
    
    
 
    return (
        <div style={{ backgroundColor:  `${code}` }} className="bubble">
            <h4 className="description">attribute</h4>
        </div>
    )
}

export default Attributes