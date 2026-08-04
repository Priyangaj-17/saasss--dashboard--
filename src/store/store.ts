import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import dashboardReducer from "@/store/slices/dashboardSlice";
import billingReducer from "@/store/slices/billingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    billing: billingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
