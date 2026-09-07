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

    // Search movies while typing
    useEffect(() => {

        if (!searchText.trim()) {

            setOptions([]);

            return;
        }

        const timer = setTimeout(async () => {

            try {

                const response = await api.get(
                    `/searchmovielist/?q=${encodeURIComponent(searchText)}`
                );

                console.log("Search results:", response.data);

                setOptions(response.data);

            } catch (error) {

                console.error("Search error:", error);

            }

        }, 200);

        return () => clearTimeout(timer);

    }, [searchText]);

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

                        // User types
                        onInputChange={(event, newInputValue) => {

                            setSearchText(newInputValue);

                        }}

                        // User selects a movie
                        onChange={async (event, newValue) => {

                            if (
                                newValue &&
                                typeof newValue === "object"
                            ) {

                                onChange(newValue);

                                console.log(
                                    "Selected movie:",
                                    newValue
                                );

                                // Save latest searched movie for THIS USER
                                try {

                                    await api.post(
                                        `/add-search-history/${newValue.tmdb_id}/`
                                    );

                                    console.log(
                                        "Search history saved:",
                                        newValue.title
                                    );

                                } catch (error) {

                                    console.error(
                                        "Search history error:",
                                        error
                                    );

                                }

                                // Tell Home.jsx that search changed
                                window.dispatchEvent(
                                    new Event("movieSearchUpdated")
                                );

                                // Go to movie details
                                navigate(
                                    `/movie/${newValue.tmdb_id}`
                                );

                                // Clear search suggestions
                                setOptions([]);

                                setSearchText("");
                            }

                        }}

                        getOptionLabel={(option) => {

                            if (typeof option === "string") {

                                return option;

                            }

                            return option?.title || "";

                        }}

                        slotProps={{

                            paper: {

                                sx: {

                                    backgroundColor: "transparent",

                                    backdropFilter: "blur(10px)",

                                    border:
                                        "1px solid rgba(255, 255, 255, 0.1)",

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

                                        backgroundColor:
                                            "transparent",

                                        "& fieldset": {

                                            border:
                                                "1px solid rgba(255, 255, 255, 0.1)",

                                        },

                                        "&:hover fieldset": {

                                            border:
                                                "1px solid rgba(255, 255, 255, 0.2)",

                                        },

                                        "&.Mui-focused fieldset": {

                                            border:
                                                "1px solid rgba(255, 255, 255, 0.3)",

                                        },

                                    },

                                    "& .MuiInputLabel-root": {

                                        color:
                                            "rgba(255,255,255,0.6)",

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