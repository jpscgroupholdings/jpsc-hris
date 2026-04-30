"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RegisterForm from "@/app/(admin)/employee/_form"; // Adjust path as needed
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function EditEmployeePage() {
  const { id } = useParams();
  const router = useRouter();

  const [initialData, setInitialData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        setLoading(true);
        // Using your specific API route
        const res = await fetch(`/api/employee/user/${id}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Employee not found");
        }

        const data = await res.json();
        setInitialData(data);
      } catch (err: any) {
        toast.error(err.message || "An error occurred while fetching data");
        router.push("/employee"); // Redirect on failure
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, router]);

  if (loading) return <Loading />;

  return (
    <div className="p-8">
      {/* 
          Passing 'key={id}' ensures that if you switch from one employee 
          to another, the entire form component re-initializes.
      */}
      <RegisterForm initialData={initialData} />
    </div>
  );
}
