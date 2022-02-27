import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { StateContext, StateSearch } from "../../store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieModal from "./MovieModal";

const style = {
  cardContainer: {
    cursor: "auto",
    alignItems: "stretch",
    transition: "transform 0.2s",
    height: "100%",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.03) translate3d(0px, -10px, 200px)",
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
  const { movies } = state as StateSearch;

  return (
    <>
      {movies &&
        movies.map((item, key) => {
          const { Poster, Title, imdbID } = item;

          return (
            <Grid item key={key} xs={6} sm={4} md={3}>
              <Card className="image-container" sx={style.cardContainer}>
                <CardMedia
                  component="img"
                  image={Poster}
                  alt={Title}
                  sx={{ height: "100%" }}
                />
                <CardActions className="overlay">
                  <Box>
                    <Tooltip title="add to favorite" arrow>
                      <IconButton className="icon" sx={style.icon}>
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    <MovieModal imdbID={imdbID} />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </>
  );
}
