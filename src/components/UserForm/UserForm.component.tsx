/**
 * component - use for both create/update user
 * condition rendering:
 * if application user click "Add New User" button this form should be rendered without any data
 *    after user entered all necessary inputs call API POST method to create new instance on server
 *  else if application user click "Edit" button this form should be rendered with init-values same as the selected profile
 *    after modification call API PUT method to update selected profile details
 */
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

  // input fields data, name MUST match the requestBody property name, Duplicate values Not allowed
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

  // conditon rendering, if application user does not want create/update any profile this form should be hidden.
  if (selectedUser === null && !showCreateUserForm) return null;

  // main rendering
  return (
    <div
      className={classes.root}
      onClick={() => {
        // dismiss form when margin has been clicked
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
              // if selectedUser is not null , means application user want to update a profile
              updateProfile(
                selectedUser.id,
                convertUserFormValuesToProfile(userFormValues, selectedUser)
              );
            } else {
              // if selectedUser is null, means application user want to create a new profile
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
