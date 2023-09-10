import { Link } from 'react-router-dom';

//CSS import
import './Pokemon.css'

function Pokemon({ name, image, id }){
    return (    
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`} >
                <img className='pokemon-image' src={image} />
                <div className='pokemon-name'>{name}</div>
            </Link>
        </div>
    )
}

export default Pokemon;