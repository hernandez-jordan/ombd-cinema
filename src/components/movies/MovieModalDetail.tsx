import { useContext, useState } from "react";

import {
  DispatchContext,
  MovieDetailsWithId,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import { splitStringToArray } from "../../util/string-conversions";

const style = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    boxShadow: 24,
    overflow: "scroll",
  },
  icon: {
    color: "white",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.2s ,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "&:hover": {
      color: "#ff0000",
      transform: "scale(1.5)",
    },
  },
  cardContainer: {
    borderRadius: 0,
    cursor: "auto",
    alignItems: "stretch",
    height: "100%",
    bgcolor: "black",
    color: "white",
  },
  button: {
    bgcolor: "white",
    width: 100,
    ml: 10,
    color: "black",
    "&:hover": {
      bgcolor: "#1976d2",
    },
  },
  buttonContainer: {
    bgcolor: "black",
    py: 2,
    px: 1,
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
};

export default function MovieModalDetail() {
  const state = useContext(StateContext);
  const { isTruncate, movie } = state as StateSearch;
  const dispatch = useContext(DispatchContext) as UserDispatch;

  const newActors = splitStringToArray(movie.Actors);

  const clickHandle = () => dispatch({ type: UserActionType.SET_TRUNCATE });

  return (
    <>
      <Card sx={style.cardContainer}>
        <CardMedia
          component="img"
          image={movie.Poster}
          alt={movie.Title}
          sx={{ height: "100%" }}
        />
        <Box sx={style.buttonContainer}>
          <Tooltip title="add to favorite" arrow>
            <IconButton className="icon" sx={style.icon}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Button sx={style.button} size="medium" startIcon={<PlayArrowIcon />}>
            Play
          </Button>
        </Box>
        <Box sx={{ px: 2, pb: 1 }}>
          <Box display="flex" justifyContent="space-between" pb={1}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="caption" gutterBottom>
                Release date: {movie.Released}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" gutterBottom>
                Type: {movie.Type}
              </Typography>
              <Typography variant="caption" gutterBottom>
                Rating: {movie.Rated}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography gutterBottom noWrap={isTruncate} variant="body1">
              {movie.Title}
            </Typography>
          </Box>
          <CardActionArea
            sx={{ transition: "transform 0.2s" }}
            disableRipple
            onClick={clickHandle}
          >
            <Typography noWrap={isTruncate} variant="body2">
              {movie.Plot}
            </Typography>
          </CardActionArea>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2">Director: {movie.Director}</Typography>
          <Box display="flex" py={1}>
            <Typography variant="body2">Actors: </Typography>
            <Box pl={1}>
              {newActors &&
                newActors.map((actor, key) => {
                  return (
                    <Box key={key}>
                      <Typography variant="body2">{actor}</Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>

          <Typography gutterBottom variant="caption">
            Awards: {movie.Awards}
          </Typography>
          <Box pt={1}>
            <Typography gutterBottom variant="caption">
              Genre: {movie.Genre}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
}
