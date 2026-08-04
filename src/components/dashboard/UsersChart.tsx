"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/Card";

interface ChartPoint {
  month: string;
  users: number;
}

export function UsersChart({ data }: { data: ChartPoint[] }) {
  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-950">Active users</h3>
      <p className="mb-6 text-sm text-ink-600">Monthly snapshot</p>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#383F4B", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#383F4B", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "#EEF0F3" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E5EA",
                boxShadow: "0 4px 16px rgba(14,16,19,0.08)",
              }}
            />
            <Bar dataKey="users" fill="#14B8A6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
