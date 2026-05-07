"use client";

import { authClient } from "@/lib/auth/auth-client";
import NavBar from "@/components/NavBar";
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavBar>{children}</NavBar>;
}
