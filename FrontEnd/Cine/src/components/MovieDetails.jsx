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
                console.log("TMDB ID:", tmdb_id);

                const response = await api.get(`/movie/${tmdb_id}/`);

                console.log("Movie:", response.data);

                setMovie(response.data);

            } catch (error) {
                console.error("Movie details error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (tmdb_id) {
            fetchMovie();
        }
    }, [tmdb_id]);

    if (loading) {
        return <div className="movie-loading">Loading...</div>;
    }

    if (!movie) {
        return <div className="movie-loading">Movie not found</div>;
    }

    return (
        <div className="movie-details">

            <div className="movie-details-content-wrapper">

                <img
                    className="movie-details-poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className="movie-details-content">

                    <h1 className="movie-details-title">
                        {movie.title}
                    </h1>

                    <p className="movie-details-info">
                        ⭐ IMDb: {movie.vote_average}
                    </p>

                    <p className="movie-details-info">
                        🎬 Director: {movie.director}
                    </p>

                    <p className="movie-details-info">
                        📅 {movie.release_date}
                    </p>

                    <p className="movie-details-info">
                        ⏱ {movie.runtime} minutes
                    </p>

                    <div className="movie-details-genres">
                        {movie.genres?.map((genre, index) => (
                            <span className="genre" key={index}>
                                {genre.name || genre}
                            </span>
                        ))}
                    </div>

                    <p className="movie-details-overview">
                        {movie.overview}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default MovieDetails;