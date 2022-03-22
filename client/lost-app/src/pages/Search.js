
import React, { useEffect, useState} from 'react';
import Loading from './Loading';


const Search = () => {

  return (
    <div className="search">
        <input type="text" class="search-bar" placeholder="Search"/>
       <button><i>search</i></button>
       <button><i>O</i></button>
    </div>
)
}



export default Search