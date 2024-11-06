import { createSlice } from '@reduxjs/toolkit';

export const recentSlice = createSlice({
  name: 'recent',
  initialState: {
    value: loadRecent(),
    ids: loadRecent().map(item => item.idDrink),
  },
  reducers: {
    addRecent: (state, action) => {
      if (state.value.length === 7) {
        state.value.shift();
        state.ids.shift();
      }

      if (state.ids.includes(action.payload.idDrink)) {
        return;
      }
      state.ids.push(action.payload.idDrink);
      state.value.push(action.payload);
      localStorage.setItem('recent', JSON.stringify(state.value));
    },
    resetRecent: state => {
      state.value = [];
    },
  },
});

function loadRecent() {
  let recent = localStorage.getItem('recent') ?? JSON.stringify([]);
  if (recent === '[object Object]') {
    return [];
  }
  return JSON.parse(recent);
}

export const { addRecent, resetRecent } = recentSlice.actions;

export default recentSlice.reducer;
