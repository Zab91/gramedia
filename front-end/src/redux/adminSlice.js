import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    data: "",
  },
};

export const userSlice = createSlice({
  name: "adminCounter",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.value.data = action.payload.data;
    },
    logoutAdmin: (state) => {
      state.value.data = "";
    },
  },
});

export const { loginAdmin, logoutAdmin } = userSlice.actions;

export default userSlice.reducer;
