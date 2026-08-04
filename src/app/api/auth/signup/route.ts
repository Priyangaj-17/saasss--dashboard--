import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, toPublicUser } from "@/lib/db";
import { signSession } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

const schema = z.object({
  name: z.string().min(2, "Name is too short."),
  company: z.string().min(2, "Company is too short."),
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  try {
    const user = db.users.create(parsed.data);
    const token = await signSession({ userId: user.id, email: user.email });

    const res = NextResponse.json({ user: toPublicUser(user) });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create account.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
