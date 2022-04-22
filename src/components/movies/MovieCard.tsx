import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext } from "react";
import {
  DispatchContext,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
  MovieDetails,
} from "../../store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieModal from "./MovieModal";
import getMoviesById from "../../service/getMovieById";
import InfoIcon from "@mui/icons-material/Info";

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

export default function MovieCard() {
  const state = useContext(StateContext);
  const { movies, movie, isOpen, favoriteMovies } = state as StateSearch;
  const dispatch = useContext(DispatchContext) as UserDispatch;

  function handleClick(movie: MovieDetails) {
    const favorites = [...favoriteMovies, movie];
    //remove duplicates from favorites[]
    const payload = [...new Set(favorites)];
    dispatch({ type: UserActionType.SET_FAV_MOVIE, payload });
  }

  const handleClickOpen = useCallback(
    async (imdbIDx: string) => {
      //TODO: fix error?
      let imdbID = "123";
      try {
        await getMoviesById({ imdbID, dispatch });
        console.log(imdbID, "imdbID");
        dispatch({ type: UserActionType.SET_MODAL_OPEN });
      } catch (error) {
        console.log(error);
        throw new Error("Movie ID doesn't exist");
      }
    },
    [movie]
  );

  return (
    <>
      {movies &&
        movies.map((movie, key) => {
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
                    <Tooltip title="add to favorite" arrow>
                      <IconButton
                        onClick={() => handleClick(movie)}
                        className="icon"
                        sx={style.icon}
                      >
                        <FavoriteIcon />
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
