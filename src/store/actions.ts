import { createAction } from "@reduxjs/toolkit";
import * as T from "store/types";

export const authorizationUser =
  createAction<{ login: string; password: string }>("authorizationUser");

export const setAuth = createAction<boolean>("setAuth");
export const setLogout = createAction("setLogout");
export const setLogin = createAction<string>("setLogin");

export const setToken = createAction<string>("setToken");
export const registerUser =
  createAction<{ login: string; password: string }>("registerUser");

export const getUserData = createAction("getUserData");
export const setUserData = createAction<T.Statistic[]>("setUserData");

export const getUserProfile = createAction("getUserProfile");
export const setUserProfile = createAction<T.User>("setUserProfile");

export const updateUserAvatar = createAction<string>("updateUserAvatar");

export const updateUserName = createAction<string>("updateUserName");
