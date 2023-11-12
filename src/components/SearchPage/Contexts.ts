import { createContext } from 'react';
import { Animal } from '../../utils/types';

export const SearchValueContext = createContext<string>(
  localStorage.getItem('searchValue') || ''
);
export const SearchResultsContext = createContext<Readonly<Animal[]>>([]);
