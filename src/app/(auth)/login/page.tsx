"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState("demo@northline.app");
  const [password, setPassword] = useState("demo1234");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ink-900">
            <Compass className="text-brand-400" size={20} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-600">Sign in to your Northline workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <p className="text-sm text-coral-500">{error}</p>}
          <Button type="submit" className="w-full" loading={status === "loading"}>
            Sign in
          </Button>
          <p className="text-center text-xs text-ink-600">
            Demo account is pre-filled — just hit sign in.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-ink-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-ink-900 underline underline-offset-2">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
