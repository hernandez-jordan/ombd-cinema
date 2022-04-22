import { Container, Grid } from "@mui/material";
import FavoriteMovies from "../components/movies/FavoriteMovies";
import Movies from "../components/movies/Movies";

export default function MoviesPage() {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh", overflow: "scroll" }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        paddingBottom={4}
      >
        <Grid item xs={12}>
          <Movies />
        </Grid>
        <Grid item xs={12}>
          <FavoriteMovies />
        </Grid>
      </Grid>
    </Container>
  );
}
