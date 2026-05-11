"use client";
import { useRouter } from "next/navigation";
import DesignationForm from "../_form";

export default function CreateDesignation() {
  const router = useRouter();

  return (
    <div className="p-8">
      <DesignationForm onSuccess={() => router.push("/admin")} />
    </div>
  );
}
