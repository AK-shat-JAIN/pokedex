
// CSS import
import { Link } from 'react-router-dom';
import './Search.css'
import useDebounce from '../../../hooks/useDebounce';

function Search({ updateName }){

    // const nameEdit = event =>{
    //     SetPokename(event.target.value);
    // }
    const debouncedCallback = useDebounce((event) => updateName(event.target.value), 500)

    return (
        <div className="search-cover">
            <input id="search-box" type="text" onChange={debouncedCallback} placeholder="Pokemon Name..."/>
            {/* <Link to={`/pokemon/${pokename.toLowerCase()}`} >
                <button className='search' type='button'>Search</button>
            </Link> */}
        </div>
    )
}

export default Search;