import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenProducts: [],
};

export const chosenProductsSlice = createSlice({
  name: 'chosenProduct',
  initialState,
  reducers: {
    buildCart: (state, action) => {
      state.chosenProducts = action.payload;
    },
    addProduct: (state, action) => {
      const otherProducts = state.chosenProducts
        .filter((prod) => prod.id !== action.payload.id);

      state.chosenProducts = [
        ...otherProducts,
        action.payload,
      ];

      const validProducts = state.chosenProducts.filter((prod) => prod.quantity > 0);
      state.chosenProducts = [...validProducts];
    },
    removeProduct: (state, action) => {
      const Products = state.chosenProducts
        .filter((prod) => prod.id !== action.payload);
      state.chosenProducts = [...Products];
    },
  },
});

export const { buildCart, addProduct, removeProduct } = chosenProductsSlice.actions;

export default chosenProductsSlice.reducer;
