import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PlanOption {
  id: "starter" | "growth" | "scale";
  name: string;
  price: number;
  tagline: string;
  features: string[];
}

interface BillingState {
  plans: PlanOption[];
  currentPlan: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  subscribing: boolean;
}

const initialState: BillingState = {
  plans: [],
  currentPlan: null,
  status: "idle",
  subscribing: false,
};

export const fetchPlans = createAsyncThunk("billing/fetchPlans", async () => {
  const res = await fetch("/api/billing/plans");
  const data = await res.json();
  return data as { plans: PlanOption[]; currentPlan: string };
});

export const subscribeToPlan = createAsyncThunk(
  "billing/subscribe",
  async (plan: PlanOption["id"]) => {
    const res = await fetch("/api/billing/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not update plan.");
    return data.user.plan as string;
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans = action.payload.plans;
        state.currentPlan = action.payload.currentPlan;
      })
      .addCase(subscribeToPlan.pending, (state) => {
        state.subscribing = true;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.subscribing = false;
        state.currentPlan = action.payload;
      })
      .addCase(subscribeToPlan.rejected, (state) => {
        state.subscribing = false;
      });
  },
});

export default billingSlice.reducer;
