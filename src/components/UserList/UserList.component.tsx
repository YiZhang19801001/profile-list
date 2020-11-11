import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { UserState, User, LoadingState } from "../../store/interfaces";
import { UserCard, WholePageLoading } from "..";
import classes from "./UserList.module.scss";

function UserList() {
  const { userList, loadingList } = useSelector(
    ({
      userState,
      loadingState,
    }: {
      userState: UserState;
      loadingState: LoadingState;
    }) => ({
      userList: userState.userList,
      loadingList: loadingState.loadingList,
    })
  );

  return (
    <>
      <WholePageLoading />
      {userList.length <= 0 && <div>No data...</div>}
      {userList.length > 0 && (
        <div
          className={classNames([
            classes.root,
            { [classes.blur]: loadingList },
          ])}
        >
          {userList.map((user: User, idx: number) => {
            return (
              <UserCard key={`user-card-${idx}`} user={user} index={idx} />
            );
          })}
        </div>
      )}
    </>
  );
}

export default UserList;
