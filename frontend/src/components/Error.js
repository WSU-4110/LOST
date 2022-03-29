import React, { useEffect, useState} from 'react';
import Loading from './Loading';


const Error = () => {
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
          <h1>We're sorry but an ERROR has occured.</h1>
        </div>
    )
}

export default Error