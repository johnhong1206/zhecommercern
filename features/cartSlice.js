import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    addQuantity: (state, { payload }) => {
      state.cart[payload].quantity = state.cart[payload].quantity + 1;
    },
    emptycCart: (state) => {
      state.cart = [];
    },
    removeFromCart: (state, { payload }) => {
      state.cart.splice(payload, 1);
    },
    removeQuantity: (state, { payload }) => {
      state.cart[payload].quantity = state.cart[payload].quantity - 1;
    },
  },
});

export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

export const {
  addToCart,
  removeFromCart,
  emptycCart,
  addQuantity,
  removeQuantity,
} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
