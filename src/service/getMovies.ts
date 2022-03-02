import axios from "axios";
import { API_KEY } from "../constants";
import { UserAction, UserActionType } from "../store";

interface ISearch {
  movieName: string;
  dispatch: (value: UserAction) => void;
  plot: boolean;
}

export default async function getMovies({
  movieName,
  dispatch,
  plot,
}: ISearch) {
  const movieNameSanitize = movieName.trimEnd();
  const PLOT = plot ? "&plot=full" : "";
  const url = `http://www.omdbapi.com/?s=${movieNameSanitize}${PLOT}&apiKey=${API_KEY}`;
  try {
    const response = await axios(url);
    if (response.status === 200 && response.data) {
      const payload = response.data.Search;
      dispatch({ type: UserActionType.SET_MOVIE_DETAIL, payload });
    }
  } catch (error) {
    console.log(error);
  }
}
