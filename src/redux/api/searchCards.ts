import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/animal/search',
  }),
  endpoints: (build) => ({
    searchCards: build.query({
      query: (params) =>
        `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`,
    }),
  }),
});

export const { useSearchCardsQuery } = cardsApi;
