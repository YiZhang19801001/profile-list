import { combineReducers } from "redux";
import userState from "./user.reducer";
import loadingState from "./loading.reducer";

export default combineReducers({
  userState,
  loadingState,
});
