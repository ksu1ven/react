import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { cardsApi } from '../api/searchCards';

const makeStore = () =>
  configureStore({
    reducer: {
      [cardsApi.reducerPath]: cardsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
