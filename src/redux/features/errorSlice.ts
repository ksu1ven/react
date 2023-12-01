import { createSlice } from '@reduxjs/toolkit';
import { ValidationError } from 'yup';

const initialState = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordRepeat: '',
  gender: '',
  accept: '',
  image: '',
  country: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setValidationErrors(state, action) {
      const errors: ValidationError[] = action.payload;
      for (const key in state) {
        state[key as keyof typeof initialState] = '';
      }
      errors.forEach((el) => {
        const path = el.path?.split('.')[0];
        if (!state[path as keyof typeof initialState])
          state[path as keyof typeof initialState] = el.message;
      });
    },
    removeValidationErrors(state) {
      for (const key in state) {
        state[key as keyof typeof initialState] = '';
      }
    },
  },
});

export const { setValidationErrors, removeValidationErrors } =
  errorSlice.actions;
export default errorSlice.reducer;
