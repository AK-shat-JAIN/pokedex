//CSS import
import './Pokemon.css'

function Pokemon({ name, image }){
    return (
        <div className='pokemon'>
            <img className='pokemon-image' src={image} />
            <div className='pokemon-name'>{name}</div>
        </div>
    )
}

export default Pokemon;