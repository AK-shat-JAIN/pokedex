import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//CSS import
import './PokemonDetail.css'


function PokemonDetail(){

    const [pokemon, SetPokemon] = useState({})
    const [isLoading, SetLoading] = useState(true);

    const { id } = useParams();
    const fetchUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    async function downloadDetails(){
        SetLoading(true);
        try {
            const response = await axios.get(fetchUrl);
            SetPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types.map((ele)=> ele.type.name),
                moves: response.data.moves.map((ele)=> ele.move.name)
            });
        } catch (error) {
            SetPokemon({});
        }finally{
            SetLoading(false);
        }
    }

    useEffect(()=>{
        downloadDetails();
    },[]);

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
                </div>
            }
        </>
    )
}

export default PokemonDetail;