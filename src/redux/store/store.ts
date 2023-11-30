import { configureStore } from '@reduxjs/toolkit';
import formSlice from '../features/formSlice';
import errorSlice from '../features/errorSlice';
import countriesSlice from '../features/countriesSlice';

export const store = configureStore({
  reducer: {
    form: formSlice,
    error: errorSlice,
    countries: countriesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
