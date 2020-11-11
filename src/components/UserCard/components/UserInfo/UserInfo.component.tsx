/**
 * component - show profile text info
 *             and also trigger update/remove functionalities
 * condition rendering - when "three dot" has been clicked, control button group should be shown
 *                        otherwise button group should be hidden.
 */
import React, { useState } from "react";
import classNames from "classnames";

import { User } from "../../../../store/interfaces";
import classes from "./UserInfo.module.scss";
import emailIcon from "../../../../assets/svg-icons/email.svg";
import contactIcon from "../../../../assets/svg-icons/contact.svg";
import phoneIcon from "../../../../assets/svg-icons/phone.svg";
import websiteIcon from "../../../../assets/svg-icons/website.svg";
import companyIcon from "../../../../assets/svg-icons/company-logo.svg";
import { useUser } from "../../../../hooks";

interface Props {
  user: User;
}

function UserInfo({ user }: Props) {
  const [showInfo, setShowInfo] = useState(true);
  const { pickProfile, deleteProfile } = useUser();

  return (
    <div
      className={classNames([
        classes.root,
        {
          [classes["stop-scroll"]]: !showInfo,
        },
      ])}
    >
      {/* control panel */}
      <div
        className={classNames(classes.control, { [classes.expand]: !showInfo })}
      >
        <div className={classes.threeDot} onClick={() => setShowInfo(false)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes["button-group"]}>
          <button
            onClick={(e) => {
              e.preventDefault();
              pickProfile(user);
              setShowInfo(true);
            }}
            disabled={user.id > 10}
          >
            Edit User
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteProfile(user.id);
              setShowInfo(true);
            }}
          >
            Remove User
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowInfo(true);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* profile info */}
      <div className={classes["personal-info"]}>
        <div className={classes.name}>
          <div>{user.name}</div>
        </div>
        <div className={classes["other-info"]}>
          <img src={emailIcon} alt="" />
          <div>{user.email}</div>
        </div>
        <div className={classes["other-info"]}>
          <img src={contactIcon} alt="" />
          <div>{`${user.address.suite}, ${user.address.street}, ${user.address.city} ${user.address.zipcode}`}</div>
        </div>
        <div className={classes["other-info"]}>
          <img src={phoneIcon} alt="" />
          <div>{user.phone}</div>
        </div>
        <div className={classes.website}>
          <img src={websiteIcon} alt="" />
          <div>
            <a href={`https://${user.website}`} target="_blank">
              {user.website}
            </a>
          </div>
        </div>
      </div>
      <div className={classes["company-info"]}>
        <img src={companyIcon} alt="" />
        <div className={classes["company-name"]}>{user.company.name}</div>
        <div className={classes["company-phrase"]}>
          {user.company.catchPhrase}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
