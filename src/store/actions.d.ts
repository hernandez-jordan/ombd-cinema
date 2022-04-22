import { MovieDetails, MovieDetailsWithId } from "./provider";
export type SetMovieDetailType = MovieDetails[];
export type SetMovieDetailByIdType = MovieDetailsWithId;

export enum UserActionType {
  SEARCH = "SEARCH",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  SET_MODAL_OPEN = "SET_MODAL_OPEN",
  SET_MODAL_CLOSE = "SET_MODAL_CLOSE",
  SET_TRUNCATE = "SET_TRUNCATE",
  FIELD = "FIELD",
  SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL",
  SET_MOVIE_DETAIL_BY_ID = "SET_MOVIE_DETAIL_BY_ID",
  SET_FAV_MOVIE = "SET_FAV_MOVIE",
}

export enum FieldNameType {
  MOVIE_NAME = "movieName",
}

export type UserAction =
  | {
      type:
        | UserActionType.SEARCH
        | UserActionType.ERROR
        | UserActionType.SUCCESS
        | UserActionType.SET_MODAL_OPEN
        | UserActionType.SET_MODAL_CLOSE
        | UserActionType.SET_TRUNCATE;
    }
  | {
      type: UserActionType.FIELD;
      field: string;
      value: string;
    }
  | {
      type: UserActionType.SET_MOVIE_DETAIL;
      payload: SetMovieDetailType;
    }
  | {
      type: UserActionType.SET_MOVIE_DETAIL_BY_ID;
      payload: SetMovieDetailByIdType;
    }
  | {
      type: UserActionType.SET_FAV_MOVIE;
      payload: SetMovieDetailType;
    };

export type UserProviderProps = {
  children?: React.ReactNode;
};
