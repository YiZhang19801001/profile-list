/**
 *  sub-component belong to UserCard component
 *  contain user-avartar only
 *  position top in small screen
 *  position left in large screen
 */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useUser } from "../../../../hooks";
import { User, LoadingState } from "../../../../store/interfaces";
import UploadingComponent from "./components/AvatarUploading.component";
import classes from "./Avatar.module.scss";

interface Props {
  user: User;
  index: number;
}

function ProfileInfo({ user, index }: Props) {
  const { avatarUrl, id, name } = user;
  const [showAvatar, setShowAvatar] = useState(true);
  const { uploadingAvatar } = useSelector(
    ({ loadingState }: { loadingState: LoadingState }) => ({
      uploadingAvatar: loadingState.uploadingAvatar,
    })
  );
  const { updateProfile } = useUser();
  const onError = () => {
    setShowAvatar(false);
  };

  const utiliseName = () => {
    const nameArr = name.split(" ");
    const utiliseArr = nameArr.map((str) => str.charAt(0).toUpperCase());
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

  // when uploading new avatar show loading component
  if (uploadingAvatar.status && uploadingAvatar.id === user.idx)
    return (
      <div className={classes.root}>
        <UploadingComponent />
      </div>
    );

  // main render
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
              updateProfile(id, { ...user, avatarUrl: result as string }, true);
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
