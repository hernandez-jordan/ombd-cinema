import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { StateContext, StateSearch } from "../../store";
import SearchBar from "./SearchBar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieModal from "./MovieModal";

const style = {
  gridContainer: {
    flexWrap: "nowrap",
    display: "-webkit-inline-box",
  },
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
  },
};

export default function Movies() {
  const state = useContext(StateContext);
  const { movies, isLoading } = state as StateSearch;

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: "column-reverse", sm: "row" }}
        alignItems={{ sm: "flex-start", md: "center" }}
        justifyContent="space-between"
        pb={2}
        pt={{ xs: 2 }}
      >
        <Typography
          sx={{ typography: { lg: "h3", md: "h4", xs: "h5" } }}
          align="left"
          py={{ xs: 1, sm: 2, md: 3 }}
          pt={{ xs: 2 }}
        >
          Movie List
        </Typography>
        <SearchBar />
      </Box>
      <Grid container spacing={3} className="row" sx={style.gridContainer}>
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
      </Grid>
    </>
  );
}
