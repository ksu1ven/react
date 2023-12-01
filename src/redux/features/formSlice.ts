import { createSlice } from '@reduxjs/toolkit';
import { FormData } from '../../utils/types';

interface State {
  formTiles: FormData[];
}

const initialState: State = {
  formTiles: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm(state, action) {
      console.log('setForm');
      const { name, age, email, password, gender, image, country } =
        action.payload;
      state.formTiles.push({
        name,
        age,
        email,
        password,
        gender,
        image,
        country,
      });
    },
  },
});

export const { setForm } = formSlice.actions;
export default formSlice.reducer;
