import {createSlice} from '@reduxjs/toolkit';

export const querySlice = createSlice({
	name: 'query',
	initialState: {
		value: '',
	},
	reducers: {
		updateQuery: (state, action) => {
			state.value = action.payload;
		},
		resetQuery: (state) => {
			state.value = '';
		},
	},
});

export const {updateQuery, resetQuery} = querySlice.actions;

export default querySlice.reducer;
