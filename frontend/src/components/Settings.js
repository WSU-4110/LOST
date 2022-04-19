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
const background = () => {
  var url = document.getElementById('bgchanger').value;
  document.getElementsByTagName('body')[0].style.backgroundImage = "url('" + url + "')";
  document.getElementsByTagName('body')[0].style.backgroundRepeat = "no-repeat";
  document.getElementsByTagName('body')[0].style.backgroundAttachment = "fixed";
  document.getElementsByTagName('body')[0].style.backgroundSize= "100% 100%";
  
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
        <div className='menuBack'>
        <div className='menuBar'></div>
        <div className='menuBar'></div>
        <div className='menuBar'></div>
        </div>
      </a>
      
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popUp">
            
            <button className='logoutBTN' onClick={logout}>
              LOGOUT
            </button>
            <br></br>
            <p>Enter the url of an image below to change the background</p>
            <input type="text" id="bgchanger" placeholder="Change Background Add URL" />
            <input type="button" onClick={background} value="Change!" />
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