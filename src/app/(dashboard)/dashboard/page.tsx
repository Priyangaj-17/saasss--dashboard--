"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboardData } from "@/store/slices/dashboardSlice";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UsersChart } from "@/components/dashboard/UsersChart";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { summary, chart, activity, status } = useAppSelector((s) => s.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl2 bg-canvas-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <RevenueChart data={chart} />
        <UsersChart data={chart} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <RecentActivityTable rows={activity} />
      </div>
    </div>
  );
}
