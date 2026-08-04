import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-canvas-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <DashboardShell user={user}>{children}</DashboardShell>
      </div>
    </div>
  );
}
