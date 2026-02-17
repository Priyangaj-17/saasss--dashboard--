import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for auth state
interface AuthState {
  accessToken: string | null; // short-lived token
  user: any | null;           // logged in user info
}

// Initial state
const initialState: AuthState = {
  accessToken: null,
  user: null,
};

// createSlice auto-generates action creators
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // When login or refresh happens
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: any }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    // When logout happens
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

// Export actions
export const { setCredentials, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
