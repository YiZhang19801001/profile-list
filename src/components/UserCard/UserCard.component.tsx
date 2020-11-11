import React from "react";
import { User } from "../../store/interfaces";
import classes from "./UserCard.module.scss";
import { Avatar, UserInfo } from "./components";

interface Props {
  user: User;
  index: number;
}

function ProfileCard({ user, index }: Props) {
  return (
    <div className={classes.root}>
      <Avatar user={user} index={index} />
      <UserInfo user={user} />
    </div>
  );
}

export default ProfileCard;
