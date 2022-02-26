import axios from "axios";
import { API_KEY } from "../constants";
import { UserActionType, UserDispatch } from "../store";

interface ISearchId {
  imdbID: string;
}

export default async function getMoviesById(
  { imdbID }: ISearchId,
  dispatch: UserDispatch
) {
  const url = `http://www.omdbapi.com/?i=${imdbID}&plot=full&apiKey=${API_KEY}`;
  try {
    const response = await axios(url);
    if (response.status === 200 && response.data) {
      const payload = response.data;
      console.log(payload, "payload");
      dispatch({ type: UserActionType.SET_MOVIE_DETAIL_BY_ID, payload });
    }
  } catch (error) {
    console.log(error, "error");
  }
}
