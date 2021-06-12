import { Button, Input } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './styles/header.css'
import SearchIcon from '@material-ui/icons/Search';
import MovieInfo from './MovieInfo'
import {BeatLoader} from 'react-spinners'

let click="block"

function Header(){

    const [searchInput, setSearchInput]=useState("")
    const [movieInfo, setMovieInfo]=useState({
        banner: "",
        title: "",
        rating: "",
        gen: [],
        plot: "",
        description:""
    })
    const [loading,setLoading]=useState(false)

    const getMovieTitle = async (searchInput) => {
        
        console.log(searchInput)
        const url= "https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/" + searchInput +"/"
        const movieTitleApi = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": ApiKey,   //Generate API keys from rapid-api
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
            }
        })
        .then(async response => {
            setSearchInput("")
            const movieTitleJson= await response.json()
            const movieId= movieTitleJson.Result[0].imdb_id
            const movieDetails= await fetch("https://data-imdb1.p.rapidapi.com/movie/id/" + movieId + "/", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": ApiKey,   //Generate API keys from rapid-api
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com"
                }
            })
            .then(async response => {
                const movieDetailJson = await response.json()
                const keys=Object.keys(movieDetailJson)[0]
                console.log(movieDetailJson[keys].image_url)
                    setMovieInfo({
                        banner: movieDetailJson[keys].image_url,
                        title: movieDetailJson[keys].title,
                        rating: movieDetailJson[keys].rating,
                        gen: [...movieDetailJson[keys].gen],
                        plot: movieDetailJson[keys].plot,
                        description:movieDetailJson[keys].description
                    })
                    setLoading(false)
                    console.log(movieInfo)
            })
            .catch(err => {
                console.error(err);
            });

        })
        .catch(err => {
            console.error(err);
        });
    }

    function handleClick(){
        setLoading(true)
        click="none"
        //console.log(click)
        getMovieTitle(searchInput)   
    }

    function backToGenres(){
        setLoading(false)
        click="block"
        //console.log(click)
        setMovieInfo(null)
    }

    useEffect(() => {
        setMovieInfo(null)
    },[])

    return(
        <>
            <div className="appHeader">
                <div className="headerImg">
                    
                </div>
                <div className="searchbox">
                        <center>
                            <Input onChange={(e) => {
                                setSearchInput(e.target.value)
                            } } value={searchInput} className="headerInput" placeholder="Search for Movies" />
                            <div onClick={handleClick} style={{display:"inline"}}><SearchIcon fontSize="large" className="headerSearch" /></div>
                        </center>
                </div>

                <div className="loadingAnimation">
                    <center>
                        <BeatLoader color="maroon" loading={loading} />
                    </center>
                </div>

                {
                    movieInfo !== null && <div style={{overflow:"hidden", marginTop:"1rem"}}>
                                            <span style={{display:"inline"}} onClick={backToGenres}><Button style={{backgroundColor:"black", color:" white", marginRight:"1rem", float:"right"}} >Back</Button></span>
                                        </div>
                }

                <div  style={movieInfo==null ? {display:"none"} : {display:"block"}} >
                    {
                        movieInfo !== null && (
                            <MovieInfo movie={movieInfo} />
                        )
                    }  
                </div>

            </div>
        </>
    )
}

export {Header, click}