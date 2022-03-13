import '../styles/Search.css';
import React from 'react';


const Search = () => {
 
    return (
        <div className="search">
            <input type="text" class="search-bar" placeholder="Search"/>
           <button><i>search</i></button>
        </div>
    )
}

export { Search };