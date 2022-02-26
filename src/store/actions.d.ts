import { MovieDetails, MovieDetailsWithId } from "./provider";
export type SetMovieDetailType = MovieDetails[];
export type SetMovieDetailByIdType = MovieDetailsWithId[];

export enum UserActionType {
  SEARCH = "SEARCH",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  IS_MODAL_OPEN = "IS_MODAL_OPEN",
  IS_MODAL_CLOSE = "IS_MODAL_CLOSE",
  FIELD = "FIELD",
  SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL",
  SET_MOVIE_DETAIL_BY_ID = "SET_MOVIE_DETAIL_BY_ID",
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
        | UserActionType.IS_MODAL_OPEN
        | UserActionType.IS_MODAL_CLOSE;
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
    };

export type UserProviderProps = {
  children?: React.ReactNode;
};
