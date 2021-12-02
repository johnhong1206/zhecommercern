import {createSlice} from '@reduxjs/toolkit';

export const pointSlice = createSlice({
  name: 'point',
  initialState: {
    userPoint: 0,
    pricePoint: 0,
    finalPoint: 0,
    finalPrice: 0,
  },
  reducers: {
    getUserPoint: (state, action) => {
      state.userPoint = action.payload;
    },
    getPricePoint: (state, action) => {
      state.pricePoint = action.payload;
    },
    getFinalPoint: (state, action) => {
      state.finalPoint = action.payload;
    },
    addFinalPrice: (state, action) => {
      state.finalPrice = action.payload;
    },
    resetPoint: state => {
      state.userPoint = state.userPoint;
      state.pricePoint = 0;
      state.finalPoint = 0;
      state.finalPrice = 0;
    },
  },
});

export const {
  getUserPoint,
  getPricePoint,
  getFinalPoint,
  resetPoint,
  addFinalPrice,
} = pointSlice.actions;

export const selectUserPoint = state => state.point.userPoint;
export const selectPricePoint = state => state.point.pricePoint;
export const selectFinalPoint = state => state.point.finalPoint;
export const selectFinalPrice = state => state.point.finalPrice;

export default pointSlice.reducer;
