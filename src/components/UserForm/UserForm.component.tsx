import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { UserState } from "../../store/interfaces";
import { useUser } from "../../hooks";
import convertUserFormValuesToProfile from "../../utils/convertUserFormValuesToProfile";
import createNewProfileObject from "../../utils/createNewProfileObject";
import classes from "./UserForm.module.scss";

function UserForm() {
  const { selectedUser, userFormValues, showCreateUserForm } = useSelector(
    ({ userState }: { userState: UserState }) => ({
      selectedUser: userState.selectedUser,
      userFormValues: userState.userFormValues,
      showCreateUserForm: userState.showCreateUserForm,
    })
  );

  const {
    updateProfile,
    updateUserFormValues,
    pickProfile,
    toggleUserForm,
    createUser,
  } = useUser();

  const inputs = [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "text", label: "Email" },
    { name: "phone", type: "text", label: "Phone" },
    { name: "website", type: "text", label: "Website" },
    { name: "suite", type: "text", label: "suite" },
    { name: "street", type: "text", label: "street" },
    { name: "city", type: "text", label: "city" },
    { name: "zipcode", type: "text", label: "zipcode" },
    { name: "companyName", type: "text", label: "company name" },
    { name: "companyPhrase", type: "text", label: "company phrase" },
  ];

  if (selectedUser === null && !showCreateUserForm) return null;

  return (
    <div
      className={classes.root}
      onClick={() => {
        pickProfile(null);
        toggleUserForm(false);
      }}
    >
      <form className={classes.content} onClick={(e) => e.stopPropagation()}>
        {inputs.map((ele, idx) => {
          return (
            <div key={`user-form-input-field-${idx}`} className={classes.field}>
              <input
                id={ele.name}
                type={ele.type}
                name={ele.name}
                value={userFormValues[ele.name]}
                onChange={updateUserFormValues}
              />
              <label
                htmlFor={ele.name}
                className={classNames({
                  [classes.placeholder]: userFormValues[ele.name].length === 0,
                })}
              >
                {ele.label}
              </label>
            </div>
          );
        })}
        <button
          onClick={(e) => {
            e.preventDefault();
            if (selectedUser) {
              updateProfile(
                selectedUser.id,
                convertUserFormValuesToProfile(userFormValues, selectedUser)
              );
            } else {
              createUser(createNewProfileObject(userFormValues));
            }
          }}
        >
          {selectedUser === null ? "Create" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
