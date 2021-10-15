import { createSlice } from "@reduxjs/toolkit";

export const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discount10: false,
    discount20: false,
    discount10percent: false,
  },
  reducers: {
    getDiscount10: (state, action) => {
      state.discount10 = action.payload;
    },
    getDiscount20: (state, action) => {
      state.discount20 = action.payload;
    },
    getDiscount10percent: (state, action) => {
      state.discount10percent = action.payload;
    },
    cancleDiscount: (state) => {
      state.discount10 = false;
      state.discount20 = false;
      state.discount10percent = false;
    },
  },
});

export const {
  getDiscount10,
  getDiscount20,
  getDiscount10percent,
  cancleDiscount,
} = discountSlice.actions;

export const selectDiscount10 = (state) => state.discount.discount10;
export const selectDiscount20 = (state) => state.discount.discount20;
export const selectDiscount10percent = (state) =>
  state.discount.discount10percent;

export default discountSlice.reducer;
