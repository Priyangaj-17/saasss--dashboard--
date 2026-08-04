"use client";

import { usePathname } from "next/navigation";
import { Topbar } from "@/components/layout/Topbar";
import type { PublicUser } from "@/store/slices/authSlice";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/billing": "Billing",
  "/settings": "Settings",
};

export function DashboardShell({ user, children }: { user: PublicUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Overview";

  return (
    <>
      <Topbar user={user} title={title} />
      <main className="flex-1 px-6 py-8 md:px-10">{children}</main>
    </>
  );
}
