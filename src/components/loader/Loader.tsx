import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

export default function Loader() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}
