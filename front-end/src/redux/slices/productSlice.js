import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chosenProducts: [],
};

export const chosenProductsSlice = createSlice({
  name: 'chosenProduct',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const otherProducts = state.chosenProducts
        .filter((prod) => prod.id !== action.payload.id);
      state.chosenProducts = [
        ...otherProducts,
        action.payload,
      ];
      const validProducts = state.chosenProducts.filter((prod) => prod.quantity > 0);
      state.chosenProducts = [...validProducts];
      console.log(state.chosenProducts);
    },
  },
});

export const { addProduct, remove } = chosenProductsSlice.actions;

export default chosenProductsSlice.reducer;
