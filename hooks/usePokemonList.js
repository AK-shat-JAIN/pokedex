import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(type){

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

        console.log("Response is from usePokemonList for",pokemonListState.POKEDEX_URL, response);

        if(type){
            SetPokemonListState((state)=>({
                ...state,
                pokemonList: response.data.pokemon
            }))
        }
        else{
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
            
            SetPokemonListState((state)=>({
                ...state, 
                pokemonList: pokemonListResult, 
                isLoading: false
            }))
        }
    }

    useEffect(()=>{
        downloadData();
    },[pokemonListState.POKEDEX_URL])

    return {pokemonListState, SetPokemonListState}
}

export default usePokemonList;