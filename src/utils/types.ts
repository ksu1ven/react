import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export type apiResponse = {
  data: {
    animals: Animal[];
    page: {
      firstPage: boolean;
      lastPage: boolean;
      numberOfElements: number;
      pageNumber: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
    };
    sort?: {
      clauses: [];
    };
  };
  error: FetchBaseQueryError | SerializedError;
};

export type Animal = {
  avian: boolean;
  canine: boolean;
  earthAnimal: boolean;
  earthInsect: boolean;
  feline: boolean;
  name: string;
  uid: string;
};

export type URLParams = {
  page?: string;
  limit?: string;
  search?: string;
  details?: string;
};
