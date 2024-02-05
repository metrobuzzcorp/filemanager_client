import { User, UserSlice } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserSlice = {
  user: {
    emailAddress: "",
    token: "",
    createdAt: "",
    id: "",
    updatedAt: "",
  },
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<User>) => ({
      ...state,
      user: action.payload,
    }),
    clearUserData: (state) => ({
      ...state,
      user: initialState.user,
    }),
  },
});

export const { clearUserData, updateUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;
