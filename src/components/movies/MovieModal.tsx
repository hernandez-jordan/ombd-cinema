import { useContext } from "react";

import getMoviesById from "../../service/getMovieById";
import MovieModalDetail from "./MovieModalDetail";
import {
  DispatchContext,
  MovieDetailsWithId,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  modal: {
    overflow: "scroll",
  },
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "'background.paper'",
    boxShadow: 24,
    overflow: "scroll",
    width: { xs: "100%", sm: 400 },
  },
  icon: {
    color: "white",
  },
  cardContainer: {
    borderRadius: 0,
    cursor: "auto",
    alignItems: "stretch",
    height: "100%",
    bgcolor: "black",
    color: "white",
  },
};

interface MovieModalProps {
  imdbID: string;
}

export default function MovieModal(props: MovieModalProps) {
  const { imdbID } = props;
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as UserDispatch;
  const { movie, isOpen } = state as StateSearch;

  const handleClickClose = () => {
    dispatch({ type: UserActionType.SET_MODAL_CLOSE });
  };

  const handleClickOpen = async () => {
    try {
      await getMoviesById({ imdbID, dispatch });
      dispatch({ type: UserActionType.SET_MODAL_OPEN });
      console.log(movie, "movie");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Tooltip title="More info" arrow>
        <IconButton onClick={handleClickOpen} className="icon" sx={style.icon}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Modal
        sx={style.modal}
        BackdropProps={{ invisible: true }}
        keepMounted
        open={isOpen}
        onClose={handleClickClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="test" sx={style.container}>
          <MovieModalDetail {...(movie as unknown as MovieDetailsWithId)} />
        </Box>
      </Modal>
    </Box>
  );
}
