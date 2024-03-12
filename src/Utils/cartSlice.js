import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(product => product.id !== id);
    },
    increaseItemCount: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.count++;
      }
    },
    decreaseItemCount: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.count--;
        if (existingItem.count === 0) {
          state.products = state.products.filter(item => item.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseItemCount, decreaseItemCount, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
