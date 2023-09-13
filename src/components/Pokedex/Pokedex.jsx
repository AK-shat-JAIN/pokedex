import { useEffect, useState } from "react";
import PokeList from "../PokeList/PokeList";
import Search from "../Search/Search";

// CSS imports
import './Pokedex.css'
import PokemonDetail from "../PokemonDetails/PokemonDetail";

function Pokedex(){

    const [pokeName, SetPokeName] = useState("");

    return (
        <div className="pokedex-cover">
            <Search updateName={SetPokeName} />
            { (!pokeName) ? <PokeList /> : <PokemonDetail key={pokeName} pokemonName={pokeName} /> }
        </div>
    )
}

export default Pokedex;