import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//CSS import
import './PokemonDetail.css'
import usePokemonList from "../../../hooks/usePokemonList";
import usePokemonDetail from "../../../hooks/usePokemonDetail";


function PokemonDetail({ pokemonName }){
    const {id} = useParams();
    const [pokemon, isLoading, pokemonListState] = usePokemonDetail(id, pokemonName);

    return (
        <>  
            {
                (isLoading) ? 
                <div className="outer">
                    Loading...
                </div>   
                    :
                (pokemon.name==undefined) ? 
                <div className="outer">
                    <div className="name">Pokemon Not Found</div>
                </div>
                    :
                <div className="outer">
                    <div className="top">
                        <div className="left">
                            <div className="name">{pokemon.name} </div>
                            <div className="details">
                                <div>Height: {pokemon.height}</div>
                                <div>Weight: {pokemon.weight}</div>
                                <div>Types : 
                                    {pokemon.types && pokemon.types.map((ele)=>
                                        <li key={ele}>{ele}</li>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <img src={pokemon.image} />
                        </div>
                    </div>

                    <div className="bottom">Moves : 
                        {pokemon.moves && pokemon.moves.join(', ')}
                    </div>

                    {pokemon.types && pokemonListState.pokemonList && 
                        <div>
                            More {pokemon.types[0]} type pokemons :
                            <ul>
                                {pokemonListState.pokemonList.slice(0,5).map((p)=><li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                            </ul>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default PokemonDetail;