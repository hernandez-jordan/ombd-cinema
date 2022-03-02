import axios from "axios";
import { API_KEY } from "../constants";
import { UserAction, UserActionType } from "../store";

interface ISearchId {
  imdbID: string;
  dispatch: (value: UserAction) => void;
}

export default async function getMoviesById({ imdbID, dispatch }: ISearchId) {
  const url = `http://www.omdbapi.com/?i=${imdbID}&plot=full&apiKey=${API_KEY}`;
  try {
    const response = await axios(url);
    if (response.status === 200 && response.data) {
      const payload = response.data;
      console.log(payload, "payload");
      dispatch({ type: UserActionType.SET_MOVIE_DETAIL_BY_ID, payload });
    }
  } catch (error) {
    console.log(error);
  }
}
