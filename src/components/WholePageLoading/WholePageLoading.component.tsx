/**
 * component - appear/disappear according to application fetching users or not
 */
import React from "react";
import { useSelector } from "react-redux";

import { LoadingState } from "../../store/interfaces";
import spinner from "../../assets/animations/spinner.svg";
import classes from "./WholePageLoading.module.scss";

function WholePageLoading() {
  const { loadingList } = useSelector(
    ({ loadingState }: { loadingState: LoadingState }) => ({
      loadingList: loadingState.loadingList,
    })
  );

  // if app not fetching users hide this component
  if (!loadingList) return null;
  // main rendering
  return (
    <div className={classes.root}>
      <img src={spinner} alt="" />
    </div>
  );
}

export default WholePageLoading;
