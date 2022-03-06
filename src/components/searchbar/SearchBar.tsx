import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import getMovies from "../../service/getMovies";
import SearchIcon from "@mui/icons-material/Search";
import {
  DispatchContext,
  FieldNameType,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";

const style = {
  formControl: {
    width: { xs: "100%" },
  },
  formControlLabel: {
    ml: 1,
    width: 100,
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "red",
      "&:hover": {
        backgroundColor: "rgb(255 255 255 / 5%)",
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "red",
    },
  },
  form: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-around",
  },
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
  const [plot, setPlot] = useState(false);

  const checkPlot = () => setPlot(!plot);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: UserActionType.SEARCH });
    try {
      await getMovies({ movieName, dispatch, plot });
      dispatch({ type: UserActionType.SUCCESS });
    } catch (err) {
      console.log(err);
      dispatch({ type: UserActionType.ERROR });
    }
  }

  return (
    <Box
      sx={{ width: { xs: "-webkit-fill-available%" } }}
      display="flex"
      alignItems="center"
    >
      <FormControl sx={style.formControl}>
        <form onSubmit={handleSubmit} className="form">
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Search Movies"
            inputProps={{ "aria-label": "search movies" }}
            value={movieName}
            onChange={(e) =>
              dispatch({
                type: UserActionType.FIELD,
                field: FieldNameType.MOVIE_NAME,
                value: e.target.value,
              })
            }
          />
          <IconButton
            type="submit"
            onSubmit={handleSubmit}
            sx={{ p: "10px", color: "white" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <Divider
            sx={{ height: 28, m: 0.5, backgroundColor: "#ffffff2e" }}
            orientation="vertical"
          />
          <Tooltip title="Plot" arrow>
            <FormControlLabel
              sx={style.formControlLabel}
              control={<Switch onChange={checkPlot} />}
              label={plot ? "Full" : "Short"}
            />
          </Tooltip>
        </form>
      </FormControl>
    </Box>
  );
}
