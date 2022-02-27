import { Box, FormControl, TextField } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import getMovies from "../../service/getMovies";
import {
  DispatchContext,
  FieldNameType,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";

const style = {
  textfield: {
    color: "white",
    width: { xs: "100%", sm: 250 },
    "& .MuiInput-input.MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated": {
      color: "white",
    },
    "& .MuiInput-root.MuiInput-underline.MuiInputBase-root": {
      "&::before": {
        borderBottom: "1px solid rgb(255 255 255 / 42%)",
      },
      "&::after": {
        borderBottom: "2px solid white",
      },
    },
  },
};

export default function SearchBar() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as UserDispatch;
  const { movieName } = state as StateSearch;

  async function handleSubmit(e: React.FormEvent) {
    console.log("movie name =", movieName);
    e.preventDefault();
    dispatch({ type: UserActionType.SEARCH });
    try {
      await getMovies({ movieName }, dispatch);
      dispatch({ type: UserActionType.SUCCESS });
    } catch (err) {
      console.log(err);
      dispatch({ type: UserActionType.ERROR });
    }
  }

  return (
    <Box>
      <FormControl sx={{ width: { sx: "100%", sm: 250 } }}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Search"
            variant="standard"
            sx={style.textfield}
            value={movieName}
            autoComplete="on"
            onChange={(e) =>
              dispatch({
                type: UserActionType.FIELD,
                field: FieldNameType.MOVIE_NAME,
                value: e.target.value,
              })
            }
          />
        </form>
      </FormControl>
    </Box>
  );
}
