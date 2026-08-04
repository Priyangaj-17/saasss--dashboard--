"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutGrid, CreditCard, Settings, Compass } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-ink-950 px-4 py-6 text-canvas-50 md:flex">
      <Link href="/dashboard" className="flex items-center gap-2 px-2 pb-8">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
          <Compass className="text-ink-950" size={18} />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight">Northline</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/10 text-white"
                  : "text-canvas-50/60 hover:bg-white/5 hover:text-canvas-50"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-xl2 bg-white/5 p-4">
        <p className="text-sm font-medium text-canvas-50">Need a hand?</p>
        <p className="mt-1 text-xs text-canvas-50/60">
          Check the docs or ping support from Settings.
        </p>
      </div>
    </aside>
  );
}
