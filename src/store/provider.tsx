import { createContext, Dispatch, useReducer } from "react";
import { UserProviderProps, movieReducer } from "./index";
import { UserAction } from "../store/actions.d";

const initialState: StateSearch = {
  movieName: "",
  movies: [],
  isLoading: false,
  error: "",
  movie: [],
  favoriteMovies: [],
  isOpen: false,
  isTruncate: true,
};

export interface StateSearch {
  movieName: string;
  movies: MovieDetails[];
  isLoading: boolean;
  error: string;
  movie: MovieDetailsWithId[];
  favoriteMovies: MovieDetails[];
  isOpen: boolean;
  isTruncate: boolean;
}

export interface MovieDetails {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface MovieDetailsWithId {
  Actors?: string;
  Awards?: string;
  Country?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster?: string;
  Rated?: string;
  Ratings?: [];
  Released?: string;
  Response?: string;
  Runtime?: string;
  Title: string;
  Type?: string;
  Writer?: string;
  Year?: string;
  imdbID?: string;
  imdbRating?: string;
  imdbVotes?: string;
  totalSeasons?: string;
}

export type UserSearch = StateSearch | null;
export type UserDispatch = Dispatch<UserAction>;

export const StateContext = createContext<UserSearch | undefined>(undefined);
export const DispatchContext = createContext<UserDispatch | undefined>(
  undefined
);

export const UserProvider = (props: UserProviderProps) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
