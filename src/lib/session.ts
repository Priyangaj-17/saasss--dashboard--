import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { db, toPublicUser } from "@/lib/db";

export const SESSION_COOKIE = "northline_session";

export async function getSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySession(token);
  return payload;
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  const user = db.users.findById(session.userId);
  if (!user) return null;
  return toPublicUser(user);
}
