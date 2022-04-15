import React, { useEffect, useState} from 'react';
import Loading from './Loading';



const Settings = () => {

  const logout = () => {

    fetch('/spotify/logout-user');
    window.open('https://www.spotify.com/us/logout/');
    setTimeout(function () {
        window.location.replace('http://localhost:8000/')
    }, 1000);
}

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
            
            <button  onClick={logout}>
              LOGOUT
            </button>
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