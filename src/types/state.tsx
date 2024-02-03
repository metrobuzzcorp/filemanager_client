export type User = {
  email: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export type UserSlice = {
  user: User;
};
