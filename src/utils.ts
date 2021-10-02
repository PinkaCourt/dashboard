const regUrl = "/user/create";
const authUrl = "/user/login";
const dataUrl = "/user/data";
const mockUrl = "/user/data/mock";
const profileUrl = "/user/profile";
const avatarUrl = "/user/update/avatar";
const nameUrl = "/user/update/name";

export const signIn = (email: string, password: string) => {
  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(authUrl, params)
    .then((response) => response.json())
    .catch((error) => error);
};

export const signUp = (email: string, password: string) => {
  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(regUrl, params)
    .then((response) => response.json())
    .catch((error) => error);
};

export const getData = (userId: string, token: string) => {
  const url = dataUrl + `?userId=${userId}`;

  const params: RequestInit = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((error) => error);
};

export const getProfile = (userId: string, token: string) => {
  const url = profileUrl + `?userId=${userId}`;

  const params: RequestInit = {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((error) => error);
};

export const updateAvatar = (userId: string, token: string, avatar: string) => {
  const url = avatarUrl + `?userId=${userId}`;

  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ userId, avatar }),
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((error) => error);
};

export const updateName = (userId: string, token: string, name: string) => {
  const url = nameUrl + `?userId=${userId}`;

  const params: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ userId, name }),
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((error) => error);
};
