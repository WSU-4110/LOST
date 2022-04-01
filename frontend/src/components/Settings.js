import React, { useEffect, useState} from 'react';
import Loading from './Loading';


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
      <button onClick={toggleModal} class="btn-modal">
        Settings
      </button>

      {modal && (
        <div class="modal">
          <div onClick={toggleModal} class="overlay"></div>
          <div class="popUp">
            <h2>Settings</h2>
            <p>Log Out </p>
            <button class="closeBtn" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings