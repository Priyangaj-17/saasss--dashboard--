"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import type { PublicUser } from "@/store/slices/authSlice";

export function Topbar({ user, title }: { user: PublicUser; title: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLogout() {
    await dispatch(logout());
    router.push("/login");
    router.refresh();
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center justify-between border-b border-canvas-200 bg-white px-6 py-4 md:px-10">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-950">{title}</h1>
        <p className="text-sm text-ink-600">{user.company}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-white">
            {initials}
          </span>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-ink-900">{user.name}</p>
            <p className="text-xs text-ink-600 capitalize">{user.plan} plan</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-canvas-200 px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-canvas-100"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
