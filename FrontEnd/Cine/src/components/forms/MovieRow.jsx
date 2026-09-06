
import React from "react";

import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import api, { getCsrfToken } from "./Axios";

function MovieRow({ movies }) {
    const navigate = useNavigate();

    const handleMovieClick = async (movie) => {
        console.log("Clicked movie:", movie);
        console.log("TMDB ID:", movie.tmdb_id);

        try {
            // Make sure CSRF cookie exists
            await api.get("/csrf/");

            const csrfToken = getCsrfToken();

            console.log("CSRF token:", csrfToken);

            // Add movie to history
            await api.post(
                `/add-history/${movie.tmdb_id}/`,
                {},
                {
                    headers: {
                        "X-CSRFToken": csrfToken,
                    },
                }
            );

            console.log("Movie added to history");
        } catch (error) {
            console.error("History error:", error);

            if (error.response?.status === 401) {
                console.log("User is not logged in");
            }

            if (error.response?.status === 403) {
                console.log("CSRF error:", error.response.data);
            }
        }

        // Go to movie detail
        navigate(`/movie/${movie.tmdb_id}`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                width: "100%",
                padding: 2,

                "&::-webkit-scrollbar": {
                    display: "none",
                },

                scrollbarWidth: "none",
            }}
        >
            {movies.map((movie) => (
                <Box
                    key={movie.tmdb_id}
                    component="img"
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : ""
                    }
                    alt={movie.title}
                    onClick={() => handleMovieClick(movie)}
                    sx={{
                        minWidth: 180,
                        width: 180,
                        height: 270,
                        objectFit: "cover",
                        borderRadius: 2,
                        flexShrink: 0,
                        cursor: "pointer",
                    }}
                />
            ))}
        </Box>
    );
}

export default MovieRow;

