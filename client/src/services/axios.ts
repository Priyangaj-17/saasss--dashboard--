import axios from "axios";
import { store } from "../apps/store";
import { setCredentials, logout } from "../features/auth/authSlice";
import e from "express";

// Base axios instance
 const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // required for refresh token cookie
});

export default api;

// Attach access token automatically to every request
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true; // prevent infinite loop

      try {
        // Call refresh endpoint
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        // Save new token in Redux
        store.dispatch(
          setCredentials({
            accessToken: res.data.accessToken,
            user: res.data.user,
          })
        );

        // Retry original request
        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);

      } catch (err) {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);
