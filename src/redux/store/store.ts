import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import paginationSlice from '../features/paginationSlice';
import limitSlice from '../features/limitSlice';
import searchSlice from '../features/searchSlice';
import loaderSlice from '../features/loaderSlice';
import resultsSlice from '../features/resultsSlice';
import { cardsApi } from '../api/searchCards';
import detailsSlice from '../features/detailsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search'],
};
const rootReducer = combineReducers({
  pagination: paginationSlice,
  limit: limitSlice,
  search: searchSlice,
  loader: loaderSlice,
  results: resultsSlice,
  details: detailsSlice,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(cardsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
