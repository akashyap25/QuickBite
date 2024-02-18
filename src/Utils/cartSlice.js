import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
    },
    reducers: {
        addToCart: (state, action) => {
        state.products.push(action.payload);
        },
        removeFromCart: (state, action) => {
        state.products = state.products.filter(
            (product) => product.id !== action.payload.id
        );
        },
        clearCart: (state,action) => {
            state.products = [];
        },
    },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

// cartSlice = {
//     actions: {
//         addToCart,
//         removeFromCart,
//         clearCart,
//     },
//     reducer: reducers,
// }


//1:47:05