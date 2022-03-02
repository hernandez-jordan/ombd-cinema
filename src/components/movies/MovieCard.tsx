import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext, useState } from "react";
import {
  DispatchContext,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieModal from "./MovieModal";
import getMoviesById from "../../service/getMovieById";
import InfoIcon from "@mui/icons-material/Info";

const style = {
  cardContainer: {
    alignItems: "stretch",
    transition: "transform 0.2s",
    height: "100%",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.03) translate3d(0px, -10px, 200px)",
    },
  },
  cardMedia: {
    height: "100%",
    cursor: "default!important",
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
  const { movies, movie, isOpen } = state as StateSearch;
  const dispatch = useContext(DispatchContext) as UserDispatch;
  const [favoriteMovie, setFavoriteMovie] = useState([{}]);

  function handleClick(movie: {}) {
    //TODO:add to fav
    console.log("click", movie);

    const newFavoriteMovie = [...favoriteMovie, movie];
    setFavoriteMovie(newFavoriteMovie);

    console.log("newFavoriteMovie", newFavoriteMovie);

    const uniqFavorites = new Set(
      [...favoriteMovie].map((item) => JSON.stringify(item))
    );
    const res = Array.from(uniqFavorites).map((e) => JSON.parse(e));
    // setFavoriteMovie(res);
    console.log("res", res);
  }

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
