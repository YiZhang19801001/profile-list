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

const themeReducer = (
  state: UserState = initState,
  action: { type: ActionTypes; payload: any }
): UserState => {
  function compare(a: User, b: User) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  }

  switch (action.type) {
    case ActionTypes.SET_USER_LIST:
      return { ...state, userList: action.payload.sort(compare) };
    case ActionTypes.SELECT_USER:
      //
      if (action.payload !== null) {
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
      return {
        ...state,
        userList: state.userList.map((ele) => {
          if (ele.id === action.payload.id) return action.payload;
          return ele;
        }),
      };
    case ActionTypes.REMOVE_USER_FROM_LIST:
      return {
        ...state,
        userList: state.userList.filter((ele) => ele.id !== action.payload),
      };
    case ActionTypes.TOGGLE_USER_FORM:
      return {
        ...state,
        showCreateUserForm: action.payload,
      };

    case ActionTypes.INSERT_INTO_USER_LIST:
      return {
        ...state,
        userList: [...state.userList, action.payload].sort(compare),
        showCreateUserForm: false,
        selectedUser: null,
      };
    default:
      return state;
  }
};

export default themeReducer;
