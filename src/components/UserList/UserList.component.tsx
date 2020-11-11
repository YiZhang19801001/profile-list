import React from "react";
import { useSelector } from "react-redux";

import { UserState, User } from "../../store/interfaces";
import { UserCard } from "..";
import classes from "./UserList.module.scss";
function UserList() {
  const { userList } = useSelector(
    ({ userState }: { userState: UserState }) => ({
      userList: userState.userList,
    })
  );

  return (
    <div className={classes.root}>
      {userList.map((user: User, idx: number) => {
        return <UserCard key={`user-card-${idx}`} user={user} index={idx} />;
      })}
    </div>
  );
}

export default UserList;
