"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signup } from "@/store/slices/authSlice";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status, error } = useAppSelector((s) => s.auth);
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await dispatch(signup(form));
    if (signup.fulfilled.match(result)) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-ink-900">
            <Compass className="text-brand-400" size={20} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-950">Create your workspace</h1>
          <p className="mt-1 text-sm text-ink-600">Start on the free Starter plan, upgrade anytime.</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          <Input label="Full name" value={form.name} onChange={update("name")} placeholder="Jordan Blake" required />
          <Input label="Company" value={form.company} onChange={update("company")} placeholder="Acme Inc." required />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={update("password")}
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
          {error && <p className="text-sm text-coral-500">{error}</p>}
          <Button type="submit" className="w-full" loading={status === "loading"}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-ink-900 underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
