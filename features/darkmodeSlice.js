import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    darkMode: false,
  },
  reducers: {
    updateDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    resetDarkMode: (state) => {
      state.darkMode = null;
    },
  },
});

export const { updateDarkMode, resetDarkMode } = darkModeSlice.actions;

export const selectDarkmode = (state) => state.darkMode.darkMode;

export default darkModeSlice.reducer;
