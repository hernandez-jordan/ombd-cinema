import { useContext } from "react";

import MovieModalDetail from "./MovieModalDetail";
import {
  DispatchContext,
  StateContext,
  StateSearch,
  UserActionType,
  UserDispatch,
} from "../../store";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

//TODO:add cancel button for mobile?
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
};

export default function MovieModal() {
  const state = useContext(StateContext);
  const { isOpen } = state as StateSearch;
  const dispatch = useContext(DispatchContext) as UserDispatch;

  const handleClickClose = () =>
    dispatch({ type: UserActionType.SET_MODAL_CLOSE });

  return (
    <Box>
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
          <MovieModalDetail />
        </Box>
      </Modal>
    </Box>
  );
}
