import { configureStore } from '@reduxjs/toolkit';
import paginationSlice from '../features/paginationSlice';
import limitSlice from '../features/limitSlice';
import searchSlice from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    pagination: paginationSlice,
    limit: limitSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
