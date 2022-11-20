import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    NIM: null,
    username: "",
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.NIM = action.payload.NIM;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.NIM = null;
      state.value.username = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
