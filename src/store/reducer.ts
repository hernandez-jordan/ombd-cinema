import { StateSearch } from "./index";
import { UserAction, UserActionType } from "../store/actions.d";

export function movieReducer(state: StateSearch, action: UserAction) {
  switch (action.type) {
    case UserActionType.SEARCH:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case UserActionType.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    case UserActionType.ERROR:
      return {
        ...state,
        isLoading: false,
        error: "movie doesn't exist",
      };
    case UserActionType.SET_MODAL_OPEN:
      return {
        ...state,
        isOpen: true,
        isTruncate: true,
      };
    case UserActionType.SET_MODAL_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case UserActionType.SET_MOVIE_DETAIL:
      return {
        ...state,
        movies: action.payload,
      };
    case UserActionType.SET_TRUNCATE:
      return {
        ...state,
        isTruncate: !state.isTruncate,
      };
    case UserActionType.SET_MOVIE_DETAIL_BY_ID:
      return {
        ...state,
        movie: action.payload,
      };
    case UserActionType.FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      break;
  }
  return state;
}
