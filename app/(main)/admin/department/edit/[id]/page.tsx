"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDepartmentById } from "@/actions/admin/departmentActions";
import DepartmentForm from "../../_form"; // Adjust this path to where your _form is
import Loading from "@/components/Loading";
import { toast } from "sonner";
import type { Department } from "@/models/admin/department";

export default function EditDepartmentPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<Department | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no ID is present, we can't edit anything
    if (!id) return;

    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const res = await getDepartmentById(id as string);

        if (res.success) {
          setInitialData(res.data);
        } else {
          toast.error(res.message || "Department not found");
          router.push("/admin"); // Send them back if the ID is bunk
        }
      } catch (err) {
        toast.error("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id, router]);

  if (loading) return <Loading />;

  return (
    <div className="p-8">
      <DepartmentForm
        initialData={initialData}
        onSuccess={() => router.push("/admin")}
      />
    </div>
  );
}
