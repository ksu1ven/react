import { createSlice } from '@reduxjs/toolkit';

const limit = Number(new URLSearchParams(window.location.search).get('limit'));

const initialState = {
  pageSize: Number(limit) || 10,
};

export const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
  },
});

export const { setPageSize } = limitSlice.actions;
export default limitSlice.reducer;
