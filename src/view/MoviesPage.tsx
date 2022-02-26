import { Container, Grid } from "@mui/material";
import Movies from "../components/movies/Movies";

export default function MoviesPage() {
  return (
    <Container maxWidth="lg">
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
      </Grid>
    </Container>
  );
}
