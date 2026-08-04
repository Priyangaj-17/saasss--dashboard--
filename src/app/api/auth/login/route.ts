import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, toPublicUser } from "@/lib/db";
import { signSession } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

const schema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
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

  const { email, password } = parsed.data;
  const user = db.users.findByEmail(email);

  if (!user || !db.users.verifyPassword(user, password)) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

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
}
