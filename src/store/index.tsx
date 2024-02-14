import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer, entityReducer } from "./slices";
import {
  entityApiMiddleware,
  entityApiReducer,
  entityApiReducerPath,
  userApiMiddleware,
  userApiReducer,
  userApiReducerPath,
} from "./apis";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const storeGenerator = () => {
  let store;

  const combinedReducers = combineReducers({
    userReducer,
    entityReducer,
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
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(userApiMiddleware, entityApiMiddleware),
    });

    const persistor = persistStore(store);

    return { store, persistor };
  }

  store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(userApiMiddleware, entityApiMiddleware),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

export const store = storeGenerator().store;
export const persistor = storeGenerator().persistor;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

export * from "./apis";
export * from "./hooks";
