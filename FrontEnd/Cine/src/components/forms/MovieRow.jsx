
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import api from "./Axios";

function MovieRow() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await api.get("/");

                console.log("API response:", response.data);

                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

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
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                        minWidth: 180,
                        width: 180,
                        height: 270,
                        objectFit: "cover",
                        borderRadius: 2,
                        flexShrink: 0,
                    }}
                />
            ))}
        </Box>
    );
}

export default MovieRow;

