/**
 * component - appear/disappear according to application uploading user avatar or not
 */
import React from "react";
import { useSelector } from "react-redux";

import { LoadingState } from "../../../../../store/interfaces";
import spinner from "../../../../../assets/animations/spinner.svg";
import classes from "./AvatarUploading.module.scss";

function WholePageLoading() {
  const { uploadingAvatar } = useSelector(
    ({ loadingState }: { loadingState: LoadingState }) => ({
      uploadingAvatar: loadingState.uploadingAvatar,
    })
  );

  // if app not uploading user avatar hide this component
  if (!uploadingAvatar.status) return null;
  // main rendering
  return (
    <div className={classes.root}>
      <img src={spinner} alt="" />
    </div>
  );
}

export default WholePageLoading;
