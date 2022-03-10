import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';

export default configureStore({
  reducer: {
    chosenProduct: productSlice,
    users: userSlice,
  },
});
