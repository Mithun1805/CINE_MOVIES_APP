
import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "./Axios";

export default function SearchBox(props) {
    const { name, control } = props;

    const [options, setOptions] = useState([]);
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();

    // Get CSRF cookie when SearchBox loads
    useEffect(() => {
        const getCsrf = async () => {
            try {
                await api.get("/csrf/");
                console.log("CSRF token loaded");
            } catch (error) {
                console.error("CSRF error:", error);
            }
        };

        getCsrf();
    }, []);

    // Search movies
    useEffect(() => {
        if (!searchText.trim()) {
            setOptions([]);
            console.log("fuck")
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await api.get(
                    `/searchmovielist/?q=${encodeURIComponent(searchText)}`
                );

                setOptions(response.data);
            } catch (error) {
                console.error("Search error:", error);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [searchText]);

    // Movie selected from search
    const handleMovieSelect = async (movie, onChange) => {
        if (!movie || typeof movie !== "object") {
            return;
        }

        console.log("Selected movie:", movie);
        console.log("TMDB ID:", movie.tmdb_id);

        onChange(movie);

        try {
            // Add movie to history
            await api.post(`/add-history/${movie.tmdb_id}/`);

            console.log("Movie added to history successfully");
        } catch (error) {
            console.error("History error:", error);

            if (error.response?.status === 401) {
                console.log("User is not logged in");
            }

            if (error.response?.status === 403) {
                console.log("CSRF error:", error.response.data);
            }
        }

        // Go to movie detail page
        navigate(`/movie/${movie.tmdb_id}`);

        // Clear suggestions
        setOptions([]);
        setSearchText("");
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <Stack spacing={2} sx={{ width: "70%" }}>
                    <Autocomplete
                        freeSolo
                        resetHighlightOnMouseLeave
                        disableClearable
                        options={options}
                        value={value || ""}

                        onInputChange={(event, newInputValue) => {
                            setSearchText(newInputValue);
                        }}

                        onChange={(event, newValue) => {
                            handleMovieSelect(newValue, onChange);
                        }}

                        getOptionLabel={(option) => {
                            if (typeof option === "string") {
                                return option;
                            }

                            return option.title || "";
                        }}

                        slotProps={{
                            paper: {
                                sx: {
                                    backgroundColor: "transparent",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    borderRadius: "10px",
                                    color: "white",
                                },
                            },

                            listbox: {
                                sx: {
                                    color: "white",

                                    "& .MuiAutocomplete-option": {
                                        color: "white",
                                    },

                                    "& .MuiAutocomplete-option:hover": {
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.08)",
                                    },

                                    "& .MuiAutocomplete-option[aria-selected='true']":
                                        {
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.12)",
                                        },
                                },
                            },
                        }}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search movies"
                                error={!!error}
                                helperText={error?.message}

                                sx={{
                                    width: "80%",

                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "10px",
                                        backgroundColor: "transparent",

                                        "& fieldset": {
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                        },

                                        "&:hover fieldset": {
                                            border: "1px solid rgba(255, 255, 255, 0.2)",
                                        },

                                        "&.Mui-focused fieldset": {
                                            border: "1px solid rgba(255, 255, 255, 0.3)",
                                        },
                                    },

                                    "& .MuiInputLabel-root": {
                                        color: "rgba(255,255,255,0.6)",
                                    },

                                    "& .MuiInputBase-input": {
                                        color: "white",
                                    },
                                }}

                                slotProps={{
                                    ...params.slotProps,

                                    input: {
                                        ...params.slotProps.input,
                                        type: "search",
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
            )}
        />
    );
}

