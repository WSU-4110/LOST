
import React, { useEffect, useState} from 'react';
import Loading from './Loading';


const Search = () => {
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
          <h1>This is the Search page</h1>
        </div>
        /* <div className="App"></div> */
    )
}

export default Search