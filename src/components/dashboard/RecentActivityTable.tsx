import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Card";

interface ActivityRow {
  id: string;
  customer: string;
  plan: string;
  amount: string;
  status: string;
  date: string;
}

const statusTone: Record<string, "positive" | "warning" | "negative"> = {
  Paid: "positive",
  Pending: "warning",
  Failed: "negative",
};

export function RecentActivityTable({ rows }: { rows: ActivityRow[] }) {
  return (
    <Card className="col-span-2 !p-0 overflow-hidden">
      <div className="border-b border-canvas-200 p-6">
        <h3 className="font-display text-base font-semibold text-ink-950">Recent invoices</h3>
        <p className="text-sm text-ink-600">Latest payments across your workspace</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-ink-600">
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Plan</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-canvas-200">
                <td className="px-6 py-3.5 font-medium text-ink-900">{row.customer}</td>
                <td className="px-6 py-3.5 text-ink-700">{row.plan}</td>
                <td className="px-6 py-3.5 text-ink-700">{row.amount}</td>
                <td className="px-6 py-3.5">
                  <Badge tone={statusTone[row.status] ?? "neutral"}>{row.status}</Badge>
                </td>
                <td className="px-6 py-3.5 text-ink-600">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
