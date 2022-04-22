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

const style = {
  modal: {
    overflow: "scroll",
  },
  container: {
    bgcolor: "'background.paper'",
    boxShadow: 24,
    overflow: "scroll",
    m: "auto",
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
