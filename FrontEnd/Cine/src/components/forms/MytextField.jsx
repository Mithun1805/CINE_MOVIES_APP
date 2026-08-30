import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MyTextFields(props) {
    const {width,placeholder,name,control,type} = props
  return (

    <Controller
    name={name}
    control = {control}
    type={type}

    render={({
        field:{onChange,value},
        fieldState:{error},
        formState,

    }) => (
     <TextField
  sx={{
    width: width,

    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },

    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },

    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
  }}
  onChange={onChange}
  value={value}
  variant="standard"
  type={type}
  placeholder={placeholder}
/>
    )
}



      
       />

   
  );
}
