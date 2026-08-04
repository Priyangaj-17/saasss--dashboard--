import bcrypt from "bcryptjs";

/**
 * This file is a tiny in-memory data layer so the app runs with zero
 * external setup. It resets whenever the server restarts.
 *
 * To go to production, swap the functions below for real queries
 * (Prisma + Postgres, Mongoose + MongoDB, etc.) and keep the same
 * function signatures so the rest of the app doesn't need to change.
 */

export type Plan = "starter" | "growth" | "scale";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  company: string;
  plan: Plan;
  createdAt: string;
}

const users: User[] = [
  {
    id: "u_demo",
    name: "Jordan Blake",
    email: "demo@northline.app",
    // password: "demo1234"
    passwordHash: bcrypt.hashSync("demo1234", 10),
    company: "Northline Labs",
    plan: "growth",
    createdAt: "2025-11-02T00:00:00.000Z",
  },
];

export const db = {
  users: {
    findByEmail(email: string) {
      return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
    },
    findById(id: string) {
      return users.find((u) => u.id === id) ?? null;
    },
    create(input: { name: string; email: string; password: string; company: string }) {
      const existing = this.findByEmail(input.email);
      if (existing) throw new Error("An account with that email already exists.");
      const user: User = {
        id: `u_${Math.random().toString(36).slice(2, 10)}`,
        name: input.name,
        email: input.email,
        passwordHash: bcrypt.hashSync(input.password, 10),
        company: input.company,
        plan: "starter",
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      return user;
    },
    updatePlan(id: string, plan: Plan) {
      const user = this.findById(id);
      if (!user) throw new Error("User not found.");
      user.plan = plan;
      return user;
    },
    verifyPassword(user: User, password: string) {
      return bcrypt.compareSync(password, user.passwordHash);
    },
  },
};

export function toPublicUser(user: User) {
  const { passwordHash, ...publicUser } = user;
  return publicUser;
}
