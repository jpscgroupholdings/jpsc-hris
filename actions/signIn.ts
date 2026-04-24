"use server";
import { auth } from "@/lib/auth/auth";
export async function signIn(username: string, password: string) {
  const response = await auth.api.signInUsername({
    body: {
      username,
      password,
      rememberMe: true,
    },
  });
  return response;
}
