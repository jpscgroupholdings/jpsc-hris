// lib/auth/permission.ts
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  //   admin: ["/dashboard", "/admin", "/proxy", "/settings", "/employee"],
  //   proxy: ["/dashboard", "/proxy", "/employee"],
  //   user: ["/dashboard", "/employee"],
};

export const PROTECTED_PREFIXES = [
  //   "/dashboard",
  //   "/admin",
  //   "/proxy",
  //   "/settings",
  //   "/employee",
];

export function canAccess(roleCode: string, pathname: string): boolean {
  const allowed = ROLE_PERMISSIONS[roleCode] ?? [];
  //   return allowed.some((path) => pathname.startsWith(path));
  return true;
}
