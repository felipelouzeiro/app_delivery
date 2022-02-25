import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice(EXAMPLE)';

export default store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
