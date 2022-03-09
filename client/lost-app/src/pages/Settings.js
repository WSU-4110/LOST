import React, { useEffect, useState} from 'react';
import Loading from './Loading';
import Popup from 'reactjs-popup';

const Settings = () => {
    return (
     <div>
      <Popup trigger={<button>Trigger</button>} position="top left">
      {close => (
        <div>
          Content here
          <a className="close" onClick={close}>
            &times;
          </a>
        </div>
      )}
    </Popup>
    </div>
    );
}

export default Settings