import React, { useEffect, useState} from 'react';
import Loading from './Loading';
import '../styles/Settings.css';
import Home from './Home';
const Settings = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <a onClick={toggleModal} className="btn-modal">
        <div className='menuBar'></div>
        <div className='menuBar'></div>
        <div className='menuBar'></div>
      </a>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popUp">
            <h2>Settings</h2>
            <button >Logout</button>
            <button className="closeBtn" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings