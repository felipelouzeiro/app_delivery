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
      console.log(state.chosenProducts);
    },
    remove: (state) => {
      state.value -= 1;
    },
  },
});

export const { addProduct, remove } = chosenProductsSlice.actions;

export default chosenProductsSlice.reducer;
