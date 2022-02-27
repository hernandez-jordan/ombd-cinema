import { useCallback, useContext, useEffect, useState } from "react";

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

interface MovieModalProps {
  imdbID: string;
}

export default function MovieModalDetail({
  Title,
  Actors,
  Poster,
  Rated,
  Genre,
  Plot,
  Released,
  Writer,
}: MovieDetailsWithId) {
  const [truncate, setTruncate] = useState(true);
  const clickHandle = () => setTruncate(!truncate);
  return (
    <>
      <Card sx={style.cardContainer}>
        <CardMedia
          component="img"
          image={Poster}
          alt={Title}
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
            <Typography variant="caption" gutterBottom>
              Release date: {Released}
            </Typography>
            <Typography variant="caption" gutterBottom>
              Rating: {Rated}
            </Typography>
          </Box>
          <CardActionArea
            sx={{ transition: "transform 0.2s" }}
            disableRipple
            onClick={clickHandle}
          >
            <Typography noWrap={truncate} variant="body2">
              {Plot}
            </Typography>
          </CardActionArea>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body2">Actors: {Actors}</Typography>
          <Typography gutterBottom variant="body2">
            Writer: {Writer}
          </Typography>
          <Typography gutterBottom variant="caption">
            Genre: {Genre}
          </Typography>
        </Box>
      </Card>
    </>
  );
}
