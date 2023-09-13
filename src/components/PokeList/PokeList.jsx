import Pokemon from "../Pokemon/Pokemon";

// CSS import
import './PokeList.css'
import usePokemonList from "../../../hooks/usePokemonList";

function PokeList(){

    const { pokemonListState, SetPokemonListState} = usePokemonList(false);

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