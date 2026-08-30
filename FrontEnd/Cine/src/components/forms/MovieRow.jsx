import React from "react";
import Box from "@mui/material/Box";

function MovieRow() {
  const movies = [
  {
    title: "Movie 1",
    poster_path: "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
  },
  {
    title: "Movie 2",
    poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  },
  {
    title: "Movie 3",
    poster_path: "/q719jXXEzOoYaps6babgKnONONX.jpg",
  },
  {
    title: "Movie 4",
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  },
  {
  title: "Movie 5",
  poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
},
  {
    title: "Movie 6",
    poster_path: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  },
  {
    title: "Movie 7",
    poster_path: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
  },
  {
    title: "Movie 8",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
  title: "Movie 9",
  poster_path: "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
},
  {
    title: "Movie 10",
    poster_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  },
];

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
      {movies.map((movie, index) => (
  <Box
    key={index}
    component="img"
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={`Movie ${index + 1}`}
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