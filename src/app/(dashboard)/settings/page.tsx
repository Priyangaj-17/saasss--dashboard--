import { getCurrentUser } from "@/lib/session";
import { Card } from "@/components/ui/Card";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const rows = [
    { label: "Full name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Company", value: user.company },
    { label: "Current plan", value: user.plan },
    { label: "Member since", value: new Date(user.createdAt).toLocaleDateString() },
  ];

  return (
    <div className="max-w-xl space-y-6">
      <Card>
        <h3 className="font-display text-base font-semibold text-ink-950">Profile</h3>
        <p className="mb-6 text-sm text-ink-600">Your account details for this workspace.</p>
        <dl className="divide-y divide-canvas-200">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3 text-sm">
              <dt className="text-ink-600">{row.label}</dt>
              <dd className="font-medium capitalize text-ink-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <p className="text-sm text-ink-600">
        This starter keeps things intentionally simple — wire up profile editing, avatar
        uploads, and team invites here as your product grows.
      </p>
    </div>
  );
}
