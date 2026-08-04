"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPlans, subscribeToPlan } from "@/store/slices/billingSlice";
import { PlanCard } from "@/components/billing/PlanCard";
import { Card } from "@/components/ui/Card";

export default function BillingPage() {
  const dispatch = useAppDispatch();
  const { plans, currentPlan, status, subscribing } = useAppSelector((s) => s.billing);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <Card className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-ink-600">Current plan</p>
          <p className="font-display text-xl font-semibold capitalize text-ink-950">
            {currentPlan ?? "—"}
          </p>
        </div>
        <p className="text-sm text-ink-600">
          Payments are simulated in this starter — connect Stripe in{" "}
          <code className="rounded bg-canvas-100 px-1.5 py-0.5 text-xs">
            src/app/api/billing/subscribe/route.ts
          </code>{" "}
          to go live.
        </p>
      </Card>

      {status === "loading" || status === "idle" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-xl2 bg-canvas-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              name={plan.name}
              price={plan.price}
              tagline={plan.tagline}
              features={plan.features}
              isCurrent={plan.id === currentPlan}
              isPending={subscribing}
              onSelect={() => dispatch(subscribeToPlan(plan.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
