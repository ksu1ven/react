import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import paginationSlice from "../features/paginationSlice";
import { cardsApi } from "../api/searchCards";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["search"],
};
const rootReducer = combineReducers({
  pagination: paginationSlice,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(cardsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);

export const persistor = persistStore(makeStore());
