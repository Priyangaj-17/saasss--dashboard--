"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";

interface ChartPoint {
  month: string;
  revenue: number;
  users: number;
}

export function RevenueChart({ data }: { data: ChartPoint[] }) {
  return (
    <Card className="col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-ink-950">Revenue trend</h3>
          <p className="text-sm text-ink-600">Monthly recurring revenue, last 6 months</p>
        </div>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5A623" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#F5A623" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E5EA" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#383F4B", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#383F4B", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E5EA",
                boxShadow: "0 4px 16px rgba(14,16,19,0.08)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#DB8F14"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
