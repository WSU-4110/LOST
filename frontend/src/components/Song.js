import React, { useEffect, useState} from 'react';
import Loading from './Loading';


const Song = () => {  
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
          <h1>this is the MusicPlayer page.</h1>
        </div>
    )
}

export default Song