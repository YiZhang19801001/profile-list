/**
 * custom hook handle all logic for CRUD users
 *
 */

import { useDispatch } from "react-redux";

import actionTypes from "../store/actionTypes";
import { usersApi } from "../apis";
import { User, CreateUserRequestBody } from "../store/interfaces";
function useProfile() {
  const dispatch = useDispatch();

  // funciton - fetch users list from API and update the state in store
  const fetchProfiles = async () => {
    try {
      // trigger whole page loading page
      dispatch({
        type: actionTypes.SET_LOADING_LIST,
        payload: true,
      });
      // call api waiting response
      const resp = await usersApi.fetchUsers();
      // after successfully fetching users, update store state
      dispatch({
        type: actionTypes.SET_USER_LIST,
        payload: [...resp.data, ...resp.data], // as requierment 1, should show min. 15 cards. this API interface only return 10 users, so duplicate values to show more cards on page.
      });
      // dismiss loading page
      dispatch({
        type: actionTypes.SET_LOADING_LIST,
        payload: false,
      });
    } catch (error) {
      // if fetching users fail, should empty the user list
      dispatch({
        type: actionTypes.SET_USER_LIST,
        payload: [],
      });
      // dismiss loading page
      dispatch({
        type: actionTypes.SET_LOADING_LIST,
        payload: false,
      });
    }
  };

  /**
   * function - update user instance on server
   * @param id profile id
   * @param newProfile new profile values
   * @param uploadingAvatar determining which loading animiation should be shown to app
   */
  const updateProfile = async (
    id: number,
    newProfile: User,
    uploadingAvatar?: boolean
  ) => {
    try {
      if (uploadingAvatar) {
        dispatch({
          type: actionTypes.SET_UPLOADING_AVATAR,
          payload: {
            status: true,
            id,
          },
        });
      } else {
        dispatch({
          type: actionTypes.SET_SUMMITTING_USER_FORM,
          payload: true,
        });
      }
      const resp = await usersApi.updateUser(id, newProfile);
      dispatch({
        type: actionTypes.SELECT_USER,
        payload: null,
      });
      dispatch({
        type: actionTypes.UPDATE_USER_LIST,
        payload: resp.data,
      });
      dispatch({
        type: actionTypes.SET_SUMMITTING_USER_FORM,
        payload: false,
      });
      dispatch({
        type: actionTypes.SET_UPLOADING_AVATAR,
        payload: {
          status: false,
          id: null,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.SET_SUMMITTING_USER_FORM,
        payload: false,
      });
      dispatch({
        type: actionTypes.SET_UPLOADING_AVATAR,
        payload: {
          status: false,
          id: null,
        },
      });
    }
  };

  /**
   * function - update state.userFormValues in redux store
   * @param e input onchange event
   */
  const updateUserFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: actionTypes.UPDATE_USER_FORM,
      payload: { [e.target.name]: e.target.value },
    });
  };

  /**
   * function - when application user want to edit a profile, this profile will save as selectedUser in store for further use
   * @param profile selected profile
   */
  const pickProfile = (profile: User | null) => {
    dispatch({
      type: actionTypes.SELECT_USER,
      payload: profile,
    });
  };

  /**
   * function - remove profile on server
   * @param id profile id
   */
  const deleteProfile = async (id: number) => {
    try {
      await usersApi.deleteUser(id);
      dispatch({
        type: actionTypes.REMOVE_USER_FROM_LIST,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * function - toggle userForm visibility
   * @param flag show/hide form
   */
  const toggleUserForm = (flag: boolean) => {
    dispatch({
      type: actionTypes.TOGGLE_USER_FORM,
      payload: flag,
    });
  };

  /**
   * function - create new user/profile instance on server
   * @param data
   */
  const createUser = async (data: CreateUserRequestBody) => {
    try {
      const newUser = await usersApi.createUser(data);
      dispatch({
        type: actionTypes.INSERT_INTO_USER_LIST,
        payload: newUser.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchProfiles,
    updateProfile,
    updateUserFormValues,
    pickProfile,
    deleteProfile,
    toggleUserForm,
    createUser,
  };
}

export default useProfile;
