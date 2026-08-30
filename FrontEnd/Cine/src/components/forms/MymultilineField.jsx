import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MyMultilineTextFields(props) {
    const {label,placeholder,width,name,control} = props
  return (

    <Controller
    name={name}
    control = {control}

    render={({
        field:{onChange,value},
        fieldState:{error},
        formState,

    }) => (

                <TextField
                sx={{width:{width}}}
          id="standard-multiline-static"
          label={label}
          onChange={onChange}
     value={value}
          multiline
          rows={1}
          variant="standard"
          placeholder={placeholder}
        />
    )
}



      
       />

   
  );
}


