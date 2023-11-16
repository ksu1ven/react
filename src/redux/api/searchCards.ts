import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiResponse } from '../../utils/types';

type Params = {
  pageNumber: number;
  pageSize: number;
  searchValue?: string;
};

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stapi.co/api/v1/rest/animal/search',
  }),
  endpoints: (build) => ({
    searchByValue: build.mutation<apiResponse, Params>({
      query: (params) => ({
        url: `?pageNumber=${params.pageNumber}&pageSize=${params.pageSize}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `${encodeURIComponent('name')}=${encodeURIComponent(
          params.searchValue || ''
        )}`,
      }),
    }),
  }),
});

export const { useSearchByValueMutation } = cardsApi;
