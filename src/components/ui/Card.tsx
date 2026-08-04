import { HTMLAttributes } from "react";
import clsx from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("card p-6", className)} {...props} />;
}

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "positive" | "warning" | "negative";
  children: React.ReactNode;
}) {
  const toneClass = {
    neutral: "bg-canvas-100 text-ink-700",
    positive: "bg-teal-500/10 text-teal-600",
    warning: "bg-brand-500/10 text-brand-600",
    negative: "bg-coral-500/10 text-coral-500",
  }[tone];

  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", toneClass)}>
      {children}
    </span>
  );
}
