"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDesignationById } from "@/actions/admin/designationActions";
import DesignationForm from "../../_form";
import Loading from "@/components/Loading";
import { toast } from "sonner";

export default function EditDesignationPage() {
  const { id } = useParams();
  const router = useRouter();

  // Explicitly typing as any or your Designation interface to avoid the 'null' error
  const [initialData, setInitialData] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDesignation = async () => {
      try {
        setLoading(true);
        const res = await getDesignationById(id as string);

        if (res.success && res.data) {
          setInitialData(res.data);
        } else {
          toast.error("Designation not found");
          router.push("/admin");
        }
      } catch (err) {
        toast.error("Failed to load designation data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignation();
  }, [id, router]);

  if (loading) return <Loading />;

  return (
    <div className="p-8">
      <DesignationForm
        initialData={initialData}
        onSuccess={() => router.push("/admin")}
      />
    </div>
  );
}
