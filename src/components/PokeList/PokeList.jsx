import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios"

// CSS import
import './PokeList.css'

function PokeList(){

    const [pokemonList, SetPokemonList] = useState([]);
    const [isLoading, SetLoading] = useState(true);

    const [POKEDEX_URL,SetPOKEDEX_URL] = useState('https://pokeapi.co/api/v2/pokemon');
    const [prevUrl, SetPrevUrl] = useState('');
    const [nextUrl, SetNextUrl] = useState('');

    async function downloadData(){
        SetLoading(true);

        const response = await axios.get(POKEDEX_URL);                   //Download list of 20 pokemons
        const results = response.data.results;

        SetPrevUrl(response.data.previous);
        SetNextUrl(response.data.next);

        //iterating over array of pokemons using their url, to create an array of promise
        const PokemonResultPromise = results.map((result)=>axios.get(result.url));
        //passing that promise array to axios.all so as to proceed after resolving all the promises
        const PokemonData = await axios.all(PokemonResultPromise);      //Array of 20 pokemons detailed data
        
        //iterating over detailed data and extracting useful information out of those
        const pokemonListResult = PokemonData.map((pokemon)=>{
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default,
                type: pokemon.data.types
            }
        })
        
        // console.log(response.data)
        // console.log(results)
        // console.log(PokemonResultPromise)
        console.log(PokemonData)
        // console.log(pokemonListResult);
        SetPokemonList(pokemonListResult);    
        SetLoading(false);
    }

    useEffect(()=>{
        downloadData();
    },[POKEDEX_URL])

    return (
        <>
            <div className="pokelist-cover">
                <div className="pokemon-wrapper">
                    {(isLoading) ? 'Loading...' : 
                        pokemonList.map((pokemon)=>
                            <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} id={pokemon.id} />
                        )
                    }
                </div>
                <div className="control">
                    <button disabled={prevUrl==null} onClick={()=>SetPOKEDEX_URL(prevUrl)}>Previous</button>
                    <button disabled={nextUrl==null} onClick={()=>SetPOKEDEX_URL(nextUrl)}>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokeList;