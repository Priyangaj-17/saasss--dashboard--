import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

const activity = [
  { id: "1", customer: "Reyes & Cole Studio", plan: "Growth", amount: "$249.00", status: "Paid", date: "Jul 28, 2026" },
  { id: "2", customer: "Marlow Analytics", plan: "Scale", amount: "$899.00", status: "Paid", date: "Jul 27, 2026" },
  { id: "3", customer: "Petal Foods Co.", plan: "Starter", amount: "$49.00", status: "Pending", date: "Jul 26, 2026" },
  { id: "4", customer: "Vantage Robotics", plan: "Growth", amount: "$249.00", status: "Paid", date: "Jul 24, 2026" },
  { id: "5", customer: "Ember Creative", plan: "Starter", amount: "$49.00", status: "Failed", date: "Jul 23, 2026" },
  { id: "6", customer: "Northwind Legal", plan: "Scale", amount: "$899.00", status: "Paid", date: "Jul 21, 2026" },
];

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ activity });
}
