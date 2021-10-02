import { createReducer } from "@reduxjs/toolkit";
import * as A from "store/actions";
import * as T from "store/types";

export interface InitState {
  accessToken: string;
  auth: boolean;
  login: string;
  user: T.User | null;
  statisticDD: T.Statistic[];
}

const initState: InitState = {
  accessToken: "",
  auth: false,
  login: "",
  user: null,
  statisticDD: [],
};

export const dashboardReducer = createReducer(initState, (builder) => {
  builder
    .addCase(A.setToken, (state, { payload }) => {
      state.accessToken = payload;
    })
    .addCase(A.setAuth, (state, { payload }) => {
      state.auth = payload;
    })
    .addCase(A.setLogin, (state, { payload }) => {
      state.login = payload;
    })
    .addCase(A.setUserProfile, (state, { payload }) => {
      state.user = payload;
    })
    .addCase(A.setUserData, (state, { payload }) => {
      state.statisticDD = payload;
    })
    .addCase(A.setLogout, (state) => {
      state.accessToken = "";
      state.auth = false;
      state.login = "";
      state.user = null;
      state.statisticDD = [];
    });
});
