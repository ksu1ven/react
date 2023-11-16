import { createSlice } from '@reduxjs/toolkit';
import { Animal } from '../../utils/types';

const initialState = {
  searchResults: <Animal[]>[],
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchResults } = resultsSlice.actions;
export default resultsSlice.reducer;
