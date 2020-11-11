/**
 * custom hook handle all logic for CRUD users
 *
 */

import { useDispatch } from "react-redux";

import actionTypes from "../store/actionTypes";
import { usersApi } from "../apis";
import { User } from "../store/interfaces";
function useProfile() {
  const dispatch = useDispatch();

  // funciton - fetch users list from API and update the state in store
  const fetchProfiles = async () => {
    try {
      const resp = await usersApi.fetchUsers();
      // after successfully fetching users, update store state
      dispatch({
        type: actionTypes.SET_USER_LIST,
        payload: resp.data,
      });
    } catch (error) {
      // if fetching users fail, should empty the user list
      dispatch({
        type: actionTypes.SET_USER_LIST,
        payload: [],
      });
    }
  };

  const updateProfile = async (id: number, newProfile: User) => {
    try {
      const resp = await usersApi.updateUser(id, newProfile);
      dispatch({
        type: actionTypes.SELECT_USER,
        payload: null,
      });
      dispatch({
        type: actionTypes.UPDATE_USER_LIST,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: actionTypes.UPDATE_USER_FORM,
      payload: { [e.target.name]: e.target.value },
    });
  };

  const pickProfile = (profile: User | null) => {
    dispatch({
      type: actionTypes.SELECT_USER,
      payload: profile,
    });
  };

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

  const toggleUserForm = (flag: boolean) => {
    dispatch({
      type: actionTypes.TOGGLE_USER_FORM,
      payload: flag,
    });
  };

  const createUser = async (data: any) => {
    try {
      const newUser = await usersApi.createUser(data);
      dispatch({
        type: actionTypes.INSERT_INTO_USER_LIST,
        payload: newUser, // as requirement 1, there must have at least 15 cards, duplicate the profile array.
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
