
// CSS import
import { Link } from 'react-router-dom';
import './Search.css'
import { useState } from 'react';

function Search(){
    const [pokename, SetPokename] = useState("");

    const nameEdit = event =>{
        SetPokename(event.target.value);
    }
    

    return (
        <div className="search-cover">
            <input id="search-box" type="text" onChange={nameEdit} placeholder="Pokemon Name..."/>
            <Link to={`/pokemon/${pokename.toLowerCase()}`} >
                <button className='search' type='button'>Search</button>
            </Link>
        </div>
    )
}

export default Search;