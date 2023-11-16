import { configureStore } from '@reduxjs/toolkit';
import paginationSlice from '../features/paginationSlice';
import limitSlice from '../features/limitSlice';
import searchSlice from '../features/searchSlice';
import loaderSlice from '../features/loaderSlice';
import resultsSlice from '../features/resultsSlice';
import { cardsApi } from '../api/searchCards';

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    limit: limitSlice,
    search: searchSlice,
    loader: loaderSlice,
    results: resultsSlice,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
