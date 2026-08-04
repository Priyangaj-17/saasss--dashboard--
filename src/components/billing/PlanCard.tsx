import { Check } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

interface PlanCardProps {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  isCurrent: boolean;
  isPending: boolean;
  onSelect: () => void;
}

export function PlanCard({ name, price, tagline, features, isCurrent, isPending, onSelect }: PlanCardProps) {
  return (
    <div
      className={clsx(
        "card flex flex-col p-6",
        isCurrent && "border-2 border-ink-900"
      )}
    >
      {isCurrent && (
        <span className="mb-3 w-fit rounded-full bg-ink-900 px-2.5 py-1 text-xs font-medium text-white">
          Current plan
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-ink-950">{name}</h3>
      <p className="mt-1 text-sm text-ink-600">{tagline}</p>
      <p className="mt-5">
        <span className="font-display text-3xl font-semibold text-ink-950">${price}</span>
        <span className="text-sm text-ink-600"> / month</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink-700">
            <Check size={16} className="mt-0.5 shrink-0 text-teal-500" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={isCurrent ? "ghost" : "accent"}
        className="mt-6 w-full"
        disabled={isCurrent}
        loading={isPending}
        onClick={onSelect}
      >
        {isCurrent ? "Current plan" : "Switch to " + name}
      </Button>
    </div>
  );
}
