import React, { useEffect, useState } from 'react'
import './styles/movieList.css'

function MoviesList(props){

    //console.log(props)
    const [movie, setMovie]=useState({
        banner: "",
        title: "",
        rating: "",
        plot: ""
    })

    useEffect(() => {
        const keys=Object.keys(props.info)
        // console.log(keys)
        setMovie(() => {
            return {
                banner: props.info[keys].image_url,
                title: props.info[keys].title,
                rating: props.info[keys].rating,
                plot: props.info[keys].plot
            }
        })
    }, [props])

    return(
        <>
            <div className="movieTile">
                <img alt="Poster Image" className="moivePoster" src={movie.banner} />
                <h3 id="movieTitle" >{movie.title}</h3>
                <p id="moviePlot">{movie.plot}</p>

                <p id="movieRating" >Rating: {movie.rating}</p>
            </div>
        </>
    )
}

export default MoviesList

//movie title in props- "/title/tt0499549/"