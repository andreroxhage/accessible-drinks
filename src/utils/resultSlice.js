import { createSlice } from '@reduxjs/toolkit';

export const resultSlice = createSlice({
  name: 'result',
  initialState: {
    value: [],
  },
  reducers: {
    updateResult: (state, action) => {
      state.value = [action.payload];
    },
    resetResult: state => {
      state.value = [];
    },
  },
});

export const { updateResult, resetResult } = resultSlice.actions;

export default resultSlice.reducer;
