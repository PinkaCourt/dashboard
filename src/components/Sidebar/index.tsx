import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as A from "store/actions";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const logout = () => {
    document.cookie = `accessToken=; max-age=-1`;
    document.cookie = `login=; max-age=-1`;
    dispatch(A.setLogout());
  };
  return (
    <div className={"sidebar_container"}>
      <div className={"sidebar_link-container"}>
        <NavLink className={"sidebar_link"} to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink className={"sidebar_link"} to="/profile">
          Profile
        </NavLink>
      </div>
      <NavLink className={"sidebar_link_logout"} to="/" onClick={logout}>
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;
