import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import darkModeReducer from "../features/darkmodeSlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import shippingReducer from "../features/shippingSlice";
import modalReducer from "../features/modalSlice";
import authModalReducer from "../features/authModalSlice";
import menuReducer from "../features//menuSlice";
import discountReducer from "../features/discountSlice";
import pointSliceReducer from "../features/pointSlice";

const reducers = combineReducers({
  darkMode: darkModeReducer,
  user: userReducer,
  cart: cartReducer,
  shipping: shippingReducer,
  modal: modalReducer,
  authModal: authModalReducer,
  menu: menuReducer,
  discount: discountReducer,
  point: pointSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
