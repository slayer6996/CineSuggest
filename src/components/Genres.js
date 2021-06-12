import React, { useEffect, useState } from 'react'
import Tile from './Tile'
import './styles/genres.css'
import MoviesList from './MoviesList'
import { Button } from '@material-ui/core'
import {click} from './Header'
import {BeatLoader} from 'react-spinners'

function Genres(){

    const [genres, setGenres]= useState([])
    const [moviesTitles, setMoviesTitle]=useState(null)
    const [movies, setMovies]=useState([])
    const [moviesInfo, setMoviesInfo]=useState([])
    const [loading, setLoading]=useState(false)

    useEffect(() =>{
        const getGenres= async () =>{
            const genresApi= await fetch("https://data-imdb1.p.rapidapi.com/genres/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": ApiKey,   //Generate API keys from rapid-api
		            "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }  
            })
            .then(async response => {
                const genresJson = await response.json()
                // console.log(genresJson)
                setGenres(genresJson.Genres)
            })
            .catch(error => {
                console.log(error)
            })
        }
        
        getGenres();
    }, [])

    function handleClick(description){    
        setLoading(true)
        console.log(description)    
        var date= new Date()
        var year=date.getFullYear()
        if(date.getMonth() <= 2){
            year-=1
        }
        const url="https://data-imdb1.p.rapidapi.com/movie/byYear/" + year + "/byGen/" + description + "/"

        const getMoviesTitles= async () => {
            const movieTitlesApi= await fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": ApiKey,   //Generate API keys from rapid-api
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }
            })
            .then(async response => {
                const movieTitlesJson = await response.json()
                console.log(movieTitlesJson)
                setMoviesTitle(movieTitlesJson)
            })
            .catch(err => {
                console.error(err);
            });
        }
        getMoviesTitles()
    }

    useEffect(() => {
        setMovies([])
        setLoading(false)
        if(moviesTitles!== null){
            const keys=Object.keys(moviesTitles)
            const movieTitleList=keys[0]
            if(moviesTitles[movieTitleList].length==0){
                alert("no data found")
            }
            for(let i=0;i<moviesTitles[movieTitleList].length;i++){
                setMovies((pre) => {
                    return [...pre, moviesTitles[movieTitleList][i].imdb_id ]
                })
            }
        }
    }, [moviesTitles])

    useEffect(() => {
        setMoviesInfo([])
        // console.log(movies)
        const getMoviesInfo= async movie => {
            const url="https://data-imdb1.p.rapidapi.com/movie/id/" + movie + "/"
            //console.log(url)
            const moviesInfoApi= await fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": ApiKey,   //Generate API keys from rapid-api
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }
            })
            .then(async response => {
                const movieInfoJson= await response.json()
                //console.log(movieInfoJson)
                setMoviesInfo(preInfo => {
                    return [...preInfo, movieInfoJson]
                })
                
            })
            .catch(err => {
                console.error(err);
            });
        }
        
        movies.map(movie => {
            getMoviesInfo(movie)
        })
        // setLoading(!loading)
    }, [movies])

    function backToGenres(){
        setLoading(false)
        setMovies([])
        setMoviesInfo([])
    }

    var customStyle={display:"block"}

    useEffect(() =>{
        // console.log(click)
        if(click==="none"){
            customStyle={
                display:'none'
            }
        } else if(click==="block"){
            customStyle={
                display:'block'
            }
        }
    },[click])

    return(
        <div style={customStyle} >

            <center>
                <div className="loadingAnimation">
                        <BeatLoader color="maroon" loading={loading} />
                </div>
            </center>

                { movies.length===0 &&  (<div>  <center>
                                                <p id="fadedText" >Or search by popular genres</p>
                                            </center> </div>) }

            <div className="genreContainer">
                    { movies.length===0 && (genres.map((genre,index) => {
                        return <Tile key={index} onclick={handleClick} description={genre.genre} />
                    }))}
            </div>
                
            <div>
                    {
                        movies.length !== 0 && <div style={{overflow:"hidden"}}>
                                                    <span style={{display:"inline"}} onClick={backToGenres}><Button style={{backgroundColor:"black", color:" white", marginRight:"1rem", float:"right"}}>Back</Button></span>
                                                </div>
                    }

                    {   movies.length !==0 && ( 
                        (moviesInfo.map(movie => {
                            return <MoviesList info={movie} /> 
                        })
                    ))}
            </div> 
            
        </div>                
    )
}

export default Genres