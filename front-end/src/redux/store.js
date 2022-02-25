import { configureStore } from '@reduxjs/toolkit';
import counterSliceEXAMPLE from './slices/counterSlice(EXAMPLE)';

export default configureStore({
  reducer: {
    counter: counterSliceEXAMPLE,
  },
});
