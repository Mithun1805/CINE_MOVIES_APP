
import React, { useEffect, useState } from "react";
import MovieRow from "./forms/MovieRow";
import api from "./forms/Axios";
import StarRateIcon from '@mui/icons-material/StarRate';



function Home() {
    const [movie, setMovie] = useState(null);
        const [movies, setMovies] = useState([]);
        const [movies2, setMovies2] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get("/top-rated/");

                console.log("API response:", response.data);

                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get("/movielist2/");

                console.log("API response:", response.data);

                setMovies2(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await api.get("/home/");

                console.log("Home movie:", response.data);

                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching home movie:", error);
            }
        };

        fetchMovie();
    }, []);

    return (
        
        <div>
             
        
            
            <div className="frst-suggest-movie-box">
                    {movie && movie.title && (
                        <div className="movie-title" style={{ width: "50%" }}>
                            <h1>{movie.title}</h1>
                            <div className="movie-overview">
                                <p>{movie.overview}</p>
                                <p style={{
                                    color:"red",
                                    fontSize:"15px",
                                    marginTop:"10px"
                                }}><StarRateIcon sx={{
                                    paddingTop:"10px",
                                }}/><span style={{ color: "white",
                                    marginBottom:"20px",
                                    display: "inline-block",
                                    paddingLeft:"2px",
                                    paddingRight:"2px"
                                 }}>{movie.vote_average}</span><span style={{
                                    color:"white",
                                    fontSize:"20px",
                                    display:"inline-block",
                                    paddingRight:"2px"
                                 }}>|</span><span style={{ color: "white",
                                    marginBottom:"20px",
                                    display: "inline-block",
                                    fontSize:"16.5px",
                                    paddingRight:"2px",
                                    marginTop:"15px"
                                 }}>{movie.genres.slice(1, 2).map((genre) => (
                                        <span key={genre.id}>
                                            {genre.name} 
                                        </span>
                                    ))}</span>
                                    <span style={{
                                    color:"white",
                                    fontSize:"20px",
                                    display:"inline-block",
                                    paddingRight:"2px"
                                 }}>|</span>
                                 
                                 <span style={{ color: "white",
                                    marginBottom:"20px",
                                    display: "inline-block",
                                    fontSize:"16.5px",
                                    paddingRight:"2px",
                                    marginTop:"15px"
                                 }}>{movie.genres.slice(0, 1).map((genre) => (
                                        <span key={genre.id}>
                                            {genre.name} 
                                        </span>
                                    ))}</span></p>
                            </div>
                            
                        </div>
                    )}
                    {movie && movie.backdrop_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                        />
                    )}
            </div>

            <div className="row">
                <MovieRow movies={movies} />
            </div>

            <div className="row">
                <MovieRow movies={movies2} />
            </div>
        </div>
    );
}

export default Home;

