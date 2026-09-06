import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./forms/Axios";

function MovieDetails() {

    const { tmdb_id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchMovie = async () => {

            try {

                const response = await api.get(
                    `/movie/${tmdb_id}/`
                );

                console.log("MOVIE DETAILS:", response.data);

                setMovie(response.data);

            } catch (error) {

                console.error(
                    "Movie details error:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchMovie();

    }, [tmdb_id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movie) {
        return <div>Movie not found</div>;
    }


    return (
        <div className="movie-details">

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />

            <div>

                <h1>{movie.title}</h1>

                <p>
                    ⭐ Rating: {movie.imdb_rating}
                </p>

                <p>
                    📅 Release Date: {movie.release_date}
                </p>

                <p>
                    🎬 Director: {movie.director}
                </p>

                <h3>Cast</h3>

                <div>
                    {movie.cast.map((person, index) => (
                        <span key={index}>
                            {person.name || person}
                        </span>
                    ))}
                </div>

                <h3>Overview</h3>

                <p>
                    {movie.overview}
                </p>

            </div>

        </div>
    );
}

export default MovieDetails;
