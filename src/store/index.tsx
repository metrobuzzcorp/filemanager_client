import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const storeGenerator = () => {
  let store;

  const combinedReducers = combineReducers({
    userReducer,
    [userApiReducerPath]: userApiReducer,
    [entityApiReducerPath]: entityApiReducer,
  });

  const isClient = typeof window !== "undefined";

  if (isClient) {
    const persistConfig = {
      key: "root",
      storage,
      blacklist: [],
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducers);

    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiMiddleware, entityApiMiddleware),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  }

  store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApiMiddleware, entityApiMiddleware),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export const store = storeGenerator().store;
export const persistor = storeGenerator().persistor;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
