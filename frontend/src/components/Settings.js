import React, { useEffect, useState} from 'react';
import Loading from './Loading';
import Home from './Home';


const Settings = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  })
  if(isLoading){
    return(
      <Loading />
    );
  }
    return (
        <div align='center'>
          <h1>This is the Settings page</h1>
        </div>
        
    )
}

export default Settings