import React from 'react'
import SearchBox from './forms/SearchBox'
import { useForm } from "react-hook-form";

function search() {
      const { control } = useForm({
    defaultValues: {
      movie: "",
    },
  });

  return (
    <div className="search">
      <SearchBox
        name="movie"
        control={control}
      />
    </div>
  );
}

export default search
