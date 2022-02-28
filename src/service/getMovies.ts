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
  const PLOT = plot ? "&plot=full" : "";
  const url = `http://www.omdbapi.com/?s=${movieName}${PLOT}&apiKey=${API_KEY}`;
  try {
    console.log(url, "url", PLOT, "plot");
    const response = await axios(url);
    if (response.status === 200 && response.data) {
      //notice
      const payload = response.data.Search.slice(0, 5);
      console.log(payload, "payload", url, "url");
      dispatch({ type: UserActionType.SET_MOVIE_DETAIL, payload });
    }
  } catch (error) {
    console.log(error, "error");
  }
}
