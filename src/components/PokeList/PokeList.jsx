import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios"

// CSS import
import './PokeList.css'

function PokeList(){

    // const [pokemonList, SetPokemonList] = useState([]);
    // const [isLoading, SetLoading] = useState(true);
    // const [POKEDEX_URL,SetPOKEDEX_URL] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [prevUrl, SetPrevUrl] = useState('');
    // const [nextUrl, SetNextUrl] = useState('');

    const [pokemonListState, SetPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        POKEDEX_URL: 'https://pokeapi.co/api/v2/pokemon',
        prevUrl: '',
        nextUrl: ''
    })

    async function downloadData(){
        SetPokemonListState((state)=>({
            ...state, 
            isLoading: true
        }))

        const response = await axios.get(pokemonListState.POKEDEX_URL);                   //Download list of 20 pokemons
        const results = response.data.results;

        SetPokemonListState((state)=>({
            ...state, 
            prevUrl: response.data.previous, 
            nextUrl: response.data.next
        }))

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
        SetPokemonListState((state)=>({
            ...state, 
            pokemonList: pokemonListResult, 
            isLoading: false
        }))
    }

    useEffect(()=>{
        downloadData();
    },[pokemonListState.POKEDEX_URL])

    return (
        <>
            <div className="pokelist-cover">
                <div className="pokemon-wrapper">
                    {(pokemonListState.isLoading) ? 'Loading...' : 
                        pokemonListState.pokemonList.map((pokemon)=>
                            <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} id={pokemon.id} />
                        )
                    }
                </div>
                <div className="control">
                    <button disabled={pokemonListState.prevUrl==null} onClick={()=>SetPokemonListState({...pokemonListState, POKEDEX_URL: pokemonListState.prevUrl})}>Previous</button>
                    <button disabled={pokemonListState.nextUrl==null} onClick={()=>SetPokemonListState({...pokemonListState, POKEDEX_URL: pokemonListState.nextUrl})}>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokeList;