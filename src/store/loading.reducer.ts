import ActionTypes from "./actionTypes";
import { LoadingState } from "./interfaces";

const initState: LoadingState = {
  loadingList: false,
  submittingUserForm: false,
  uploadingAvatar: {
    status: false,
    id: null,
  },
};

const loadingReducer = (
  preState: LoadingState = initState,
  action: { type: ActionTypes; payload: any }
): LoadingState => {
  switch (action.type) {
    case ActionTypes.SET_LOADING_LIST:
      return { ...preState, loadingList: action.payload };
    case ActionTypes.SET_SUMMITTING_USER_FORM:
      return { ...preState, submittingUserForm: action.payload };
    case ActionTypes.SET_UPLOADING_AVATAR:
      return { ...preState, uploadingAvatar: action.payload };

    default:
      return preState;
  }
};

export default loadingReducer;
