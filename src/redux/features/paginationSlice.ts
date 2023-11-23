import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useRouter } from "next/router";

const initialState = {
  paginationButtonsValue: <number[]>[],
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPaginationButtonsValue(state, action) {
      state.paginationButtonsValue = action.payload;
    },

    clickNextPrevButton(state, action) {
      const increaseDecreaseNumber = action.payload == "next" ? 1 : -1;
      state.paginationButtonsValue = state.paginationButtonsValue.map(
        (el) => el + increaseDecreaseNumber
      );
    },
    clickLastPage(state, action) {
      if (action.payload.totalPages > state.paginationButtonsValue.length)
        state.paginationButtonsValue = state.paginationButtonsValue.map(
          (_, ind) =>
            action.payload.totalPages -
            state.paginationButtonsValue.length +
            ind
        );
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setPaginationButtonsValue, clickNextPrevButton, clickLastPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
