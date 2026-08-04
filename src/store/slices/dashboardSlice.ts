import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SummaryItem {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

interface ChartPoint {
  month: string;
  revenue: number;
  users: number;
}

interface ActivityRow {
  id: string;
  customer: string;
  plan: string;
  amount: string;
  status: string;
  date: string;
}

interface DashboardState {
  summary: SummaryItem[];
  chart: ChartPoint[];
  activity: ActivityRow[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: DashboardState = {
  summary: [],
  chart: [],
  activity: [],
  status: "idle",
};

export const fetchDashboardData = createAsyncThunk("dashboard/fetch", async () => {
  const [statsRes, activityRes] = await Promise.all([
    fetch("/api/dashboard/stats"),
    fetch("/api/dashboard/activity"),
  ]);
  const stats = await statsRes.json();
  const activity = await activityRes.json();
  return { summary: stats.summary, chart: stats.chart, activity: activity.activity };
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summary = action.payload.summary;
        state.chart = action.payload.chart;
        state.activity = action.payload.activity;
      })
      .addCase(fetchDashboardData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default dashboardSlice.reducer;
