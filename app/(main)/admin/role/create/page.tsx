"use client";

import { useRouter } from "next/navigation";
import RoleForm from "../_form";

export default function CreateRolePage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <RoleForm onSuccess={() => router.push("/admin")} />
    </div>
  );
}
