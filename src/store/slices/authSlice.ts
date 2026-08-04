import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "starter" | "growth" | "scale";
  createdAt: string;
}

interface AuthState {
  user: PublicUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

async function handle(res: Response) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await handle(res);
    return data.user as PublicUser;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: { name: string; company: string; email: string; password: string }) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await handle(res);
    return data.user as PublicUser;
  }
);

export const fetchCurrentUser = createAsyncThunk("auth/me", async () => {
  const res = await fetch("/api/auth/me");
  if (!res.ok) return null;
  const data = await res.json();
  return data.user as PublicUser;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await fetch("/api/auth/logout", { method: "POST" });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Could not sign in.";
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Could not create account.";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
