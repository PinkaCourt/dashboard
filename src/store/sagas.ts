import { call, fork, put, select, takeEvery } from "redux-saga/effects";

import {
  signIn,
  signUp,
  getData,
  getProfile,
  updateAvatar,
  updateName,
} from "utils";
import * as A from "store/actions";
import * as S from "store/selectors";
import * as T from "store/types";

function* checkingCookies() {
  const allCookies = document.cookie;

  if (allCookies === "") {
    return;
  }

  let cookies = new Map();

  allCookies.split("; ").forEach((e) => {
    const pair = e.split("=");
    const name = pair[0];
    const value = pair[1];
    cookies.set(name, value);
  });

  if (
    cookies.get("accessToken") !== "" &&
    cookies.get("accessToken") !== "undefined"
  ) {
    yield put(A.setLogin(cookies.get("login")));
    yield put(A.setToken(cookies.get("accessToken")));
    yield put(A.setAuth(true));
    yield put(A.getUserProfile());
    yield put(A.getUserData());
  }
}

function* authorizationUser({
  payload,
}: ReturnType<typeof A.authorizationUser>) {
  const user: T.UserAuth = yield call(signIn, payload.login, payload.password);

  if (!user.error) {
    document.cookie = `accessToken=${user.accessToken}; max-age=864e2`;
    document.cookie = `login=${payload.login}`;

    yield put(A.setToken(user.accessToken));
    yield put(A.setLogin(payload.login));
    yield put(A.setAuth(true));
    yield call(getUserProfile);
    yield call(getUserData);
  }
}

function* registerUser({ payload }: ReturnType<typeof A.registerUser>) {
  yield call(signUp, payload.login, payload.password);

  yield fork(A.authorizationUser, payload);
}

function* getUserData() {
  const login: ReturnType<typeof S.selectLogin> = yield select(S.selectLogin);
  const token: ReturnType<typeof S.selectToken> = yield select(S.selectToken);

  const data: T.serverDataUser = yield call(getData, login, token);

  yield put(A.setUserData(data.items));
}

function* getUserProfile() {
  const userId: ReturnType<typeof S.selectLogin> = yield select(S.selectLogin);
  const token: ReturnType<typeof S.selectToken> = yield select(S.selectToken);

  const profile: T.User = yield call(getProfile, userId, token);

  if (!profile) {
    return;
  }
  yield put(A.setUserProfile(profile));
}

function* updateUserAvatar({ payload }: ReturnType<typeof A.updateUserAvatar>) {
  const userId: ReturnType<typeof S.selectLogin> = yield select(S.selectLogin);
  const token: ReturnType<typeof S.selectToken> = yield select(S.selectToken);

  yield call(updateAvatar, userId, token, payload);
  yield call(getUserProfile);
}

function* updateUserName({ payload }: ReturnType<typeof A.updateUserName>) {
  const userId: ReturnType<typeof S.selectLogin> = yield select(S.selectLogin);
  const token: ReturnType<typeof S.selectToken> = yield select(S.selectToken);

  yield call(updateName, userId, token, payload);
  yield call(getUserProfile);
}

export default function* fetchUser() {
  yield fork(checkingCookies);
  yield takeEvery(A.authorizationUser, authorizationUser);
  yield takeEvery(A.registerUser, registerUser);
  yield takeEvery(A.updateUserAvatar, updateUserAvatar);
  yield takeEvery(A.updateUserName, updateUserName);
  yield takeEvery(A.getUserProfile, getUserProfile);
  yield takeEvery(A.getUserData, getUserData);
}
