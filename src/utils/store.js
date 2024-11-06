import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';
import selectedReducer from './selectedSlice';
import recentReducer from './recentSlice';
import resultReducer from './resultSlice';

export default configureStore({
  reducer: {
    query: queryReducer,
    selected: selectedReducer,
    recent: recentReducer,
    result: resultReducer,
  },
});
