import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

function seededSeries(seed: number, points: number, base: number, variance: number) {
  let value = base;
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    const wobble = Math.sin(seed + i * 1.7) * variance;
    value = Math.max(0, value + wobble + variance * 0.15);
    out.push(Math.round(value));
  }
  return out;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const revenue = seededSeries(2, 6, 18000, 1400);
  const activeUsers = seededSeries(5, 6, 1200, 90);

  const summary = [
    {
      label: "Monthly recurring revenue",
      value: `$${revenue[revenue.length - 1].toLocaleString()}`,
      delta: "+12.4%",
      trend: "up" as const,
    },
    {
      label: "Active users",
      value: activeUsers[activeUsers.length - 1].toLocaleString(),
      delta: "+4.1%",
      trend: "up" as const,
    },
    {
      label: "Churn rate",
      value: "2.3%",
      delta: "-0.6%",
      trend: "up" as const,
    },
    {
      label: "Avg. response time",
      value: "184ms",
      delta: "+9ms",
      trend: "down" as const,
    },
  ];

  const chart = months.map((month, i) => ({
    month,
    revenue: revenue[i],
    users: activeUsers[i],
  }));

  return NextResponse.json({ summary, chart });
}
