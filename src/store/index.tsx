import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";
import {
  entityApiMiddleware,
  entityApiReducer,
  entityApiReducerPath,
  userApiMiddleware,
  userApiReducer,
  userApiReducerPath,
} from "./apis";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    userReducer,
    [userApiReducerPath]: userApiReducer,
    [entityApiReducerPath]: entityApiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiMiddleware, entityApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
