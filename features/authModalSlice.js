import { createSlice } from "@reduxjs/toolkit";

export const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    authModal: false,
  },
  reducers: {
    openauthModal: (state) => {
      state.authModal = true;
    },
    closeauthModal: (state) => {
      state.authModal = false;
    },
  },
});

export const { openauthModal, closeauthModal } = authModalSlice.actions;

export const selectauthModalIsOpen = (state) => state.authModal.authModal;

export default authModalSlice.reducer;
