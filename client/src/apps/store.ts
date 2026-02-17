import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

// configureStore sets up Redux with good defaults
export const store = configureStore({
  reducer: {
    // all global slices go here
    auth: authReducer,
  },
});

// RootState gives full state type
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch type for dispatch usage
export type AppDispatch = typeof store.dispatch;
