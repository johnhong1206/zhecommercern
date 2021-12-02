import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    products: null,
    filteredProducts: null,
    finalPrice: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    updateFilters: (state, action) => {
      state.filteredProducts = action.payload;
    },
    clearFilters: state => {
      state.filteredProducts = state.products;
    },
    addToCart: (state, {payload}) => {
      state.cart.push(payload);
    },
    addQuantity: (state, {payload}) => {
      state.cart[payload].quantity = state.cart[payload].quantity + 1;
    },
    emptycCart: state => {
      state.cart = [];
    },
    removeFromCart: (state, {payload}) => {
      state.cart.splice(payload, 1);
    },
    removeQuantity: (state, {payload}) => {
      state.cart[payload].quantity = state.cart[payload].quantity - 1;
    },
  },
});

export const getCartTotal = cart =>
  cart?.reduce((amount, item) => item.price + amount, 0);

export const {
  addToCart,
  addToBasket,
  removeFromCart,
  emptycCart,
  addQuantity,
  removeQuantity,
  addProducts,
  updateFilters,
  clearFilters,
} = cartSlice.actions;

export const selectCart = state => state.cart.cart;
export const selectProducts = state => state.cart.products;
export const selectFilteredProducts = state => state.cart.filteredProducts;
export default cartSlice.reducer;
