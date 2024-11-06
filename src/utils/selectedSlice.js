import { createSlice } from '@reduxjs/toolkit';

export const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    value: '',
  },
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
    resetSelected: state => {
      state.value = '';
    },
  },
});

export const { setSelected, resetSelected } = selectedSlice.actions;

export default selectedSlice.reducer;
