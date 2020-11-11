import React, { useEffect } from "react";
import { CreateUserButton, UserList, UserForm } from "../../components";
import { useUser } from "../../hooks";
import "normalize.css";
import classes from "./index.module.scss";

const UserListPage = () => {
  const { fetchProfiles } = useUser();
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className={classes.root}>
      <CreateUserButton />
      <UserForm />
      <UserList />
    </div>
  );
};

export default UserListPage;
