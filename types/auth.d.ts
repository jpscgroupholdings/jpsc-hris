// types/auth.d.ts
import type { auth } from "@/lib/auth/auth";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
