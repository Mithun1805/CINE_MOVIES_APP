
import React, { useEffect, useState } from "react";

import MovieRow from "./forms/MovieRow";

import api from "./forms/Axios";

import StarRateIcon from "@mui/icons-material/StarRate";

function Home() {
    const [movie, setMovie] = useState(null);

    const [movies, setMovies] = useState([]);

    const [movies2, setMovies2] = useState([]);

    // Movies recommended based on the user's latest search
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    // Title of the latest searched movie
    const [selectedMovieTitle, setSelectedMovieTitle] = useState("");

    // Existing top-rated movies
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

    // Existing second movie row
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

    // Existing home movie
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

    // Fetch recommendations based on the latest searched movie
    const fetchRecommendations = async (movieTitle) => {
        if (!movieTitle || !movieTitle.trim()) {
            setRecommendedMovies([]);
            setSelectedMovieTitle("");
            return;
        }

        try {
            console.log(
                "Getting recommendations for latest searched movie:",
                movieTitle
            );

            const response = await api.get(
                `/recommendations/?movie=${encodeURIComponent(movieTitle)}`
            );

            console.log("Recommendation response:", response.data);

            setRecommendedMovies(response.data);
            setSelectedMovieTitle(movieTitle);
        } catch (error) {
            console.error("Recommendation error:", error);
            setRecommendedMovies([]);
        }
    };

    // Load the latest search belonging to the logged-in user
    useEffect(() => {
        const fetchLatestSearch = async () => {
            try {
                const response = await api.get("/latest-search/");

                console.log("Latest search:", response.data);

                if (response.data?.title) {
                    fetchRecommendations(response.data.title);
                } else {
                    setRecommendedMovies([]);
                    setSelectedMovieTitle("");
                }
            } catch (error) {
                console.error("Latest search error:", error);

                // 404 means the user has no search history yet
                if (error.response?.status === 404) {
                    setRecommendedMovies([]);
                    setSelectedMovieTitle("");
                }
            }
        };

        fetchLatestSearch();
    }, []);

    // Listen for a new movie selected from SearchBox
    useEffect(() => {
        const handleMovieSearchUpdated = () => {
            console.log("Search updated - getting latest search");

            const fetchLatestSearch = async () => {
                try {
                    const response = await api.get("/latest-search/");

                    console.log(
                        "Latest search after update:",
                        response.data
                    );

                    if (response.data?.title) {
                        fetchRecommendations(response.data.title);
                    }
                } catch (error) {
                    console.error(
                        "Latest search update error:",
                        error
                    );
                }
            };

            fetchLatestSearch();
        };

        window.addEventListener(
            "movieSearchUpdated",
            handleMovieSearchUpdated
        );

        return () => {
            window.removeEventListener(
                "movieSearchUpdated",
                handleMovieSearchUpdated
            );
        };
    }, []);

    /*
     * IMPORTANT:
     * If recommendations exist, use the FIRST recommended movie
     * as the Home hero/backdrop.
     *
     * If there are no recommendations, use the existing /home/
     * movie as the fallback.
     */
    const heroMovie =
        recommendedMovies.length > 0
            ? recommendedMovies[0]
            : movie;

    return (
        <div>
            {/* EXISTING HERO SECTION */}
            <div className="frst-suggest-movie-box">
                {heroMovie && heroMovie.title && (
                    <div
                        className="movie-title"
                        style={{ width: "50%" }}
                    >
                        <h1>{heroMovie.title}</h1>

                        <div className="movie-overview">
                            <p>{heroMovie.overview}</p>

                            <p
                                style={{
                                    color: "red",
                                    fontSize: "15px",
                                    marginTop: "10px",
                                }}
                            >
                                <StarRateIcon
                                    sx={{
                                        paddingTop: "10px",
                                    }}
                                />

                                <span
                                    style={{
                                        color: "white",
                                        marginBottom: "20px",
                                        display: "inline-block",
                                        paddingLeft: "2px",
                                        paddingRight: "2px",
                                    }}
                                >
                                    {heroMovie.vote_average}
                                </span>

                                <span
                                    style={{
                                        color: "white",
                                        fontSize: "20px",
                                        display: "inline-block",
                                        paddingRight: "2px",
                                    }}
                                >
                                    |
                                </span>

                                <span
                                    style={{
                                        color: "white",
                                        marginBottom: "20px",
                                        display: "inline-block",
                                        fontSize: "16.5px",
                                        paddingRight: "2px",
                                        marginTop: "15px",
                                    }}
                                >
                                    {heroMovie.genres?.slice(1, 2).map(
                                        (genre) => (
                                            <span key={genre.id}>
                                                {genre.name}
                                            </span>
                                        )
                                    )}
                                </span>

                                <span
                                    style={{
                                        color: "white",
                                        fontSize: "20px",
                                        display: "inline-block",
                                        paddingRight: "2px",
                                    }}
                                >
                                    |
                                </span>

                                <span
                                    style={{
                                        color: "white",
                                        marginBottom: "20px",
                                        display: "inline-block",
                                        fontSize: "16.5px",
                                        paddingRight: "2px",
                                        marginTop: "15px",
                                    }}
                                >
                                    {heroMovie.genres?.slice(0, 1).map(
                                        (genre) => (
                                            <span key={genre.id}>
                                                {genre.name}
                                            </span>
                                        )
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                )}

                {heroMovie && heroMovie.backdrop_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
                        alt={heroMovie.title}
                    />
                )}
            </div>

            {/* CONTENT BASED RECOMMENDATION ROW */}
            {recommendedMovies.length > 1 && (
                <div className="row">
                    <h2 className="movie-row-title">
                        Recommended Movies
                    </h2>

                    <MovieRow
                        movies={recommendedMovies.slice(1)}
                    />
                </div>
            )}

            {/* EXISTING FIRST MOVIE ROW */}
            <div className="row">
                <h2 className="movie-row-title">
                    Top Rated Movies
                </h2>

                <MovieRow
                    movies={movies}
                />
            </div>

            {/* EXISTING SECOND MOVIE ROW */}
            <div className="row">
                <h2 className="movie-row-title">
                    Popular Movies
                </h2>

                <MovieRow
                    movies={movies2}
                />
            </div>
        </div>
    );
}

export default Home;

