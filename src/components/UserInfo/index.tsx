import React from "react";
import { useSelector } from "react-redux";

import { selectUser } from "store/selectors";
import "./UserInfo.css";

const UserInfo = () => {
  const user = useSelector(selectUser);

  if (user === null) {
    return null;
  }

  const { avatar, email, name } = user;

  const source =
    user.avatar === null ? "/ava.jpg" : `data:image/gif;base64,${avatar}`;

  return (
    <div className={"userInfo"}>
      <div className={"userInfo_container"}>
        <span className={"userInfo_name"}>{name}</span>
        <span className={"userInfo_email"}>{email} </span>
      </div>
      <img className={"userInfo_img"} src={source} alt={"avatar"} />
    </div>
  );
};

export default UserInfo;
