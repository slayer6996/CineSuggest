import { Button } from '@material-ui/core'
import React from 'react'
import './styles/movieInfo.css'

function MovieInfo(props){

    var genres=""

    if(props.movie!== null)
    props.movie.gen.map(movie => {
        genres+=" " + movie.genre
    })

    return(
        <>
            <div className="movieInfoTile">
                <img className="movieInfoPoster" src={props.movie.banner} />
                <h2 id="movieTitle">{props.movie.title}</h2>
                <p id="movieRating">Rating {props.movie.rating}</p>
                <p id="movieGenres" >{genres}</p>
                <h4 className="heading">Plot</h4>
                <p id="moivePlot">{props.movie.plot}</p>
                <h4 className="heading">Description</h4>
                <p id="movieDescription">{props.movie.description}</p>
            </div>
        </>
    )
}

export default MovieInfo