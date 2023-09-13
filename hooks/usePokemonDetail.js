import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetail(id){
    const [pokemon, SetPokemon] = useState({})
    const [isLoading, SetLoading] = useState(true);
    const fetchUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    async function downloadDetails(){
        SetLoading(true);
        try {
            const response = await axios.get(fetchUrl);
            console.log("Locally response is from usePokemonDetail", response)
            // const { pokemonListState } = usePokemonList(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : 'normal'}`, true);

            SetPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.map((ele)=> ele.type.name),
                moves: response.data.moves.map((ele)=> ele.move.name)
            });

            SetPokemonListState({...pokemonListState,  POKEDEX_URL: `https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : 'normal'}`})
        } catch (error) {
            SetPokemon({});
        }finally{
            SetLoading(false);
        }
    }

    const { pokemonListState, SetPokemonListState } = usePokemonList(true);

    useEffect(()=>{
        downloadDetails();
        console.log(pokemonListState)
    },[]);

    return [pokemon, isLoading, pokemonListState]
}

export default usePokemonDetail;