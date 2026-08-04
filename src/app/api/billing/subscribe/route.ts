import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, toPublicUser } from "@/lib/db";
import { getSession } from "@/lib/session";

const schema = z.object({
  plan: z.enum(["starter", "growth", "scale"]),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  // NOTE: this is a mock upgrade flow with no real payment processing.
  // Wire this up to Stripe (or your billing provider) before going live:
  // create/update a Checkout Session or Subscription here instead.
  const user = db.users.updatePlan(session.userId as string, parsed.data.plan);
  return NextResponse.json({ user: toPublicUser(user) });
}
