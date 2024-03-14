import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "cart-items";

const initialState = {
  products: JSON.parse(localStorage.getItem(localStorageKey)) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }
      localStorage.setItem(localStorageKey, JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(product => product.id !== id);
      localStorage.setItem(localStorageKey, JSON.stringify(state.products));
    },
    increaseItemCount: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.count++;
      }
      localStorage.setItem(localStorageKey, JSON.stringify(state.products));
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
      localStorage.setItem(localStorageKey, JSON.stringify(state.products));
    },
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem(localStorageKey);
    },
  },
});

export const { addToCart, removeFromCart, increaseItemCount, decreaseItemCount, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
