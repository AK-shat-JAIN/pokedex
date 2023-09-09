import PokeList from "../PokeList/PokeList";
import Search from "../Search/Search";

// CSS imports
import './Pokedex.css'

function Pokedex(){
    return (
        <div className="pokedex-cover">
            <h1 className="title">POKEDEX</h1>
            <Search />
            <PokeList />
        </div>
    )
}

export default Pokedex;