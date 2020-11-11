import ActionTypes from "./actionTypes";
import { UserFormValues, UserState, User } from "./interfaces";

const initUserFormValues: UserFormValues = {
  city: "",
  companyName: "",
  companyPhrase: "",
  email: "",
  name: "",
  phone: "",
  street: "",
  suite: "",
  website: "",
  zipcode: "",
};

const initState: UserState = {
  userList: [],
  selectedUser: null,
  userFormValues: initUserFormValues,
  showCreateUserForm: false,
};

const userReducer = (
  state: UserState = initState,
  action: { type: ActionTypes; payload: any }
): UserState => {
  switch (action.type) {
    case ActionTypes.SET_USER_LIST:
      return { ...state, userList: action.payload };
    case ActionTypes.SELECT_USER:
      //
      if (action.payload !== null) {
        // set userFormValues base on selected user's profile
        return {
          ...state,
          selectedUser: action.payload,
          userFormValues: {
            name: action.payload.name,
            city: action.payload.address.city,
            phone: action.payload.phone,
            companyName: action.payload.company.name,
            companyPhrase: action.payload.company.catchPhrase,
            email: action.payload.email,
            street: action.payload.address.street,
            suite: action.payload.address.suite,
            website: action.payload.website,
            zipcode: action.payload.address.zipcode,
          },
        };
      } else {
        // reset userFormValues
        return {
          ...state,
          selectedUser: null,
          userFormValues: initUserFormValues,
        };
      }
    case ActionTypes.UPDATE_USER_FORM:
      return {
        ...state,
        userFormValues: { ...state.userFormValues, ...action.payload },
      };
    case ActionTypes.RESET_USER_FORM:
      return { ...state, userFormValues: initUserFormValues };
    case ActionTypes.UPDATE_USER_LIST:
      // update userList element value after API.PUT success
      return {
        ...state,
        userList: state.userList.map((ele) => {
          if (ele.idx === action.payload.idx) return action.payload;
          return ele;
        }),
      };
    case ActionTypes.REMOVE_USER_FROM_LIST:
      // update userList after API.DELETE success
      return {
        ...state,
        userList: state.userList.filter((ele) => ele.idx !== action.payload),
      };
    case ActionTypes.TOGGLE_USER_FORM:
      return {
        ...state,
        showCreateUserForm: action.payload,
      };

    case ActionTypes.INSERT_INTO_USER_LIST:
      return {
        ...state,
        userList: [
          ...state.userList,
          { ...action.payload, idx: state.userList.length },
        ],
        showCreateUserForm: false,
        selectedUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
