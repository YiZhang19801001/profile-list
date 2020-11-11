/**
 * component - overlap button for toggling userForm
 */
import React from "react";
import { useSelector } from "react-redux";

import { UserState } from "../../store/interfaces";
import classes from "./CreateUserButton.module.scss";
import { useUser } from "../../hooks";

function CreateUserButton() {
  const { toggleUserForm } = useUser();
  const { showCreateUserForm, selectedUser } = useSelector(
    ({ userState }: { userState: UserState }) => ({
      showCreateUserForm: userState.showCreateUserForm,
      selectedUser: userState.selectedUser,
    })
  );

  if (showCreateUserForm || selectedUser !== null) return null;

  return (
    <button
      className={classes.root}
      onClick={(e) => {
        e.preventDefault();
        toggleUserForm(true);
      }}
    >
      Add New User
    </button>
  );
}

export default CreateUserButton;
