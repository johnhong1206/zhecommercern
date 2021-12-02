import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState: {
    shipping: null,
  },
  reducers: {
    updateShipping: (state, {payload}) => {
      state.shipping = payload;
    },
    resetShipping: state => {
      state.shipping = null;
    },
  },
});

export const {updateShipping, resetShipping} = shippingSlice.actions;

export const selectShipping = state => state.shipping.shipping;

export default shippingSlice.reducer;
