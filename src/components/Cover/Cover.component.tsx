import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import classes from "./Cover.module.scss";

function Cover() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => {
      clearTimeout(t);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={classNames(classes.root, { [classes.dispear]: !visible })}>
      <div>BTC</div>
      <div>User Profile Cards</div>
    </div>,
    document.querySelector("#cover")!
  );
}

export default Cover;
