import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  accept: false,
  image: '',
  country: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm(state, action) {
      console.log(state, action);
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;
