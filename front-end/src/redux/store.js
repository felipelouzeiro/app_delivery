import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice(EXAMPLE)';

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
});
