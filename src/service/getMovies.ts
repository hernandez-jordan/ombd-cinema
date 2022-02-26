import axios from "axios";
import { API_KEY } from "../constants";
import { UserActionType, UserDispatch } from "../store";

interface ISearch {
  movieName: string;
}

export default async function getMovies(
  { movieName }: ISearch,
  dispatch: UserDispatch
) {
  const url = `http://www.omdbapi.com/?s=${movieName}&apiKey=${API_KEY}`;
  try {
    const response = await axios(url);
    if (response.status === 200 && response.data) {
      const payload = response.data.Search;
      console.log(payload, "payload");
      dispatch({ type: UserActionType.SET_MOVIE_DETAIL, payload });
    }
  } catch (error) {
    console.log(error, "error");
  }
}
