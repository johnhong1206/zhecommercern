import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: false,
  },
  reducers: {
    openmenu: (state) => {
      state.menu = true;
    },
    closemenu: (state) => {
      state.menu = false;
    },
  },
});

export const { openmenu, closemenu } = menuSlice.actions;

export const selectmenuIsOpen = (state) => state.menu.menu;

export default menuSlice.reducer;
