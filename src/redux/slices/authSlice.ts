/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  auth: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  auth: false,
  loading: true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.loading = false;
    },
    setAuth: (state, action: PayloadAction<any>) => {
      state.auth = action.payload;
      state.loading = false;
    },
  },
});

export const { logout, loginSuccess, setAuth } = authSlice.actions;

export default authSlice.reducer;
