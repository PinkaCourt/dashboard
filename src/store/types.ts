export type UserAuth = {
  accessToken: string;
  auth: boolean;
  avatar: null | string;
  email: string;
  name: null;
  error?: string;
};

export type Statistic = {
  id: number;
  ds: string;
  ans: string;
  wtl: string;
  userId: string;
  date: number;
};

export type serverDataUser = {
  items: Statistic[];
  message: string;
};

export type User = {
  avatar: null | string;
  email: string;
  name: null | string;
};
