import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

export function StatCard({ label, value, delta, trend }: StatCardProps) {
  const positive = trend === "up";
  return (
    <Card className="flex flex-col gap-3">
      <p className="text-sm font-medium text-ink-600">{label}</p>
      <p className="font-display text-2xl font-semibold text-ink-950">{value}</p>
      <div
        className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
          positive ? "bg-teal-500/10 text-teal-600" : "bg-coral-500/10 text-coral-500"
        }`}
      >
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {delta}
      </div>
    </Card>
  );
}
