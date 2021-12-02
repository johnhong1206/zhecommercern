import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

//reducer

import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import shippingReducer from '../features/shippingSlice';
import discountReducer from '../features/discountSlice';
import pointSliceReducer from '../features/pointSlice';

const reducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  discount: discountReducer,
  point: pointSliceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
