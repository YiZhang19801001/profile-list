import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useUser } from "../../../../hooks";
import { User } from "../../../../store/interfaces";
import classes from "./Avatar.module.scss";

interface Props {
  user: User;
  index: number;
}

function ProfileInfo({ user, index }: Props) {
  const { avatarUrl, id, name } = user;
  const [showAvatar, setShowAvatar] = useState(true);
  const { updateProfile } = useUser();
  const onError = () => {
    setShowAvatar(false);
  };

  const utiliseName = () => {
    const nameArr = name.split(" ");
    const utiliseArr = nameArr.map((str) => str.charAt(0));
    return utiliseArr.join("");
  };

  useEffect(() => {
    if (!avatarUrl) {
      onError();
    } else {
      setShowAvatar(true);
    }
  }, [avatarUrl]);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className={classes.root}>
      {user.id <= 10 && (
        <input
          type="file"
          className={classes["hidden-input"]}
          id={`${name}-avatar-input-${index}`}
          onChange={async (e) => {
            if (e.target.files) {
              const result = await toBase64(e.target.files[0]);
              updateProfile(id, { ...user, avatarUrl: result as string });
            }
          }}
        />
      )}
      <label htmlFor={`${name}-avatar-input-${index}`}>
        {showAvatar && <img src={avatarUrl!} alt="" onError={onError} />}
        {!showAvatar && (
          <div
            className={classNames({
              [classes["font-size-sm"]]: utiliseName().length > 2,
            })}
          >
            {utiliseName()}
          </div>
        )}
      </label>
    </div>
  );
}

export default ProfileInfo;
