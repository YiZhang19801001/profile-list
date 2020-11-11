/**
 * Setup redux store
 * As I put all async api call to hook
 * We donot need redux-thunk here
 */
import { createStore } from "redux";
import reducer from "./reducers.index";

const store = createStore(reducer);

export default store;
