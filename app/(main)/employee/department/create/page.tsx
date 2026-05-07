"use client";

import { useRouter } from "next/navigation";
import DepartmentForm from "../_form";

export default function CreateDepartmentPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <DepartmentForm onSuccess={() => router.push("/config")} />
    </div>
  );
}
