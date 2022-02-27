import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { StateContext, StateSearch } from "../../store";
import SearchBar from "./SearchBar";
import Loader from "../loader/Loader";
import MovieCard from "./MovieCard";

const style = {
  gridContainer: {
    flexWrap: "nowrap",
    display: "-webkit-inline-box",
  },
};

export default function Movies() {
  const state = useContext(StateContext);
  const { isLoading } = state as StateSearch;

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
        {isLoading ? <Loader /> : <MovieCard />}
      </Grid>
    </>
  );
}
