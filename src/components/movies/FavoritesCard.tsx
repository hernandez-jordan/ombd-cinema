import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext, useEffect } from "react";
import {
  DispatchContext,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";
import InfoIcon from "@mui/icons-material/Info";
import MovieModal from "./MovieModal";
import DeleteIcon from "@mui/icons-material/Delete";
import getMoviesById from "../../service/getMovieById";

const style = {
  cardContainer: {
    alignItems: "stretch",
    height: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardMedia: {
    height: "100%",
    cursor: "pointer",
    transition: "transform 0.75s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  icon: {
    color: "white",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.2s, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      color: "#ff0000",
      transform: "scale(1.3)",
    },
  },
};

export default function FavoritesCard() {
  const state = useContext(StateContext);
  const { isOpen, favoriteMovies, movie } = state as StateSearch;
  const dispatch = useContext(DispatchContext) as UserDispatch;

  function handleClickDelete(imdbID: string) {
    const removeFavoriteMovies = [...favoriteMovies].filter(
      (value) => value.imdbID !== imdbID
    );
    const payload = removeFavoriteMovies;
    dispatch({ type: UserActionType.SET_FAV_MOVIE, payload });
  }

  useEffect(() => {
    console.log(favoriteMovies, "favoriteMovies");
  }, [favoriteMovies]);

  const handleClickOpen = useCallback(
    async (imdbID: string) => {
      try {
        await getMoviesById({ imdbID, dispatch });
        dispatch({ type: UserActionType.SET_MODAL_OPEN });
      } catch (error) {
        console.log(error);
      }
    },
    [movie]
  );

  return (
    <>
      {favoriteMovies &&
        favoriteMovies
          .filter((value) => Object.keys(value))
          .map((movie, key) => {
            const { Poster, Title, imdbID } = movie;

            return (
              <Grid item key={key} xs={6} sm={4} md={3}>
                <Card className="image-container" sx={style.cardContainer}>
                  <CardMedia
                    component="img"
                    image={Poster}
                    alt={Title}
                    sx={style.cardMedia}
                  />
                  <CardActions className="overlay">
                    <Box>
                      <Tooltip title="remove favorite" arrow>
                        <IconButton
                          onClick={() => handleClickDelete(imdbID)}
                          className="icon"
                          sx={style.icon}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Tooltip title="More info" arrow>
                        <IconButton
                          onClick={() => handleClickOpen(imdbID)}
                          className="icon"
                          sx={style.icon}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      {isOpen && <MovieModal />}
    </>
  );
}
