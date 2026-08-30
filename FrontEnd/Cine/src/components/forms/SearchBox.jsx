
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

export default function SearchBox(props) {
    const{name,control} = props
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <Stack spacing={2} sx={{ width: "70%"}}>

          <Autocomplete
  freeSolo
  resetHighlightOnMouseLeave
  disableClearable
  options={top100Films.map((option) => option.title)}
  value={value || ""}
  onChange={(event, newValue) => {
    onChange(newValue);
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
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },

        "& .MuiAutocomplete-option[aria-selected='true']": {
          backgroundColor: "rgba(255, 255, 255, 0.12)",
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
        width:"80%",
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

const top100Films = [
  {
    title: "Mithun",
    year: 2005,
  },
  {
    title: "Inception",
    year: 2010,
  },
  {
    title: "Interstellar",
    year: 2014,
  },
];


