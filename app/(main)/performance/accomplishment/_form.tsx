"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/UI/Button";
import { NewspaperIcon, XIcon, EditIcon } from "lucide-react";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";
import InputField from "@/components/UI/InputField";

interface AccomplishmentFormProps {
  initialData?: any; // Pass the existing document here for Edit mode
  onSuccess?: () => void;
}

export default function AccomplishmentForm({
  initialData,
  onSuccess,
}: AccomplishmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SearchSelectOption[]>([]);
  const [userId, setUserId] = useState<string>("");

  const [form, setForm] = useState({
    dateStart: "",
    dateEnd: "",
    accomplishment1: "",
    accomplishment2: "",
    accomplishment3: "",
    accomplishment4: "",
    accomplishment5: "",
  });

  const isEditMode = !!initialData?._id;

  // 1. Fetch Employee options for the SearchSelect
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employee/user/");
        const json = await res.json();
        const mapped = json.map((emp: any) => ({
          value: emp._id,
          label: `${emp.firstName} ${emp.lastName}`,
          description: emp.designation?.name || emp.designation,
        }));
        setOptions(mapped);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchEmployees();
  }, []);

  // 2. Populate form if in Edit Mode
  useEffect(() => {
    if (initialData) {
      setUserId(initialData.userId?._id || initialData.userId || "");
      setForm({
        dateStart: initialData.dateStart
          ? new Date(initialData.dateStart).toISOString().split("T")[0]
          : "",
        dateEnd: initialData.dateEnd
          ? new Date(initialData.dateEnd).toISOString().split("T")[0]
          : "",
        accomplishment1: initialData.accomplishment1 || "",
        accomplishment2: initialData.accomplishment2 || "",
        accomplishment3: initialData.accomplishment3 || "",
        accomplishment4: initialData.accomplishment4 || "",
        accomplishment5: initialData.accomplishment5 || "",
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("Please select an employee");

    setLoading(true);
    try {
      const url = isEditMode
        ? `/api/performance/accomplishment/${initialData._id}`
        : "/api/performance/accomplishment";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save accomplishment");
      }

      toast.success(
        `Accomplishment Form ${isEditMode ? "Updated" : "Created"}`,
      );

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/performance");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 border-b pb-2">
          {isEditMode
            ? "Edit Accomplishment Form"
            : "Create Accomplishment Form"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <SearchSelect
            className="pb-6"
            label="Employee"
            placeholder="Select an employee..."
            options={options}
            value={userId || undefined}
            onChange={(val) => setUserId(val || "")}
            disabled={loading || isEditMode} // Usually you don't change the owner during edit
          />

          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Evaluation Period
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Date Start"
              type="date"
              required
              value={form.dateStart}
              onChange={(e) => handleChange("dateStart", e.target.value)}
            />
            <InputField
              label="Date End"
              type="date"
              required
              value={form.dateEnd}
              onChange={(e) => handleChange("dateEnd", e.target.value)}
            />
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Key Accomplishments
          </h2>
          <p className="mb-5 text-xs text-gray-400">
            List the top 5 achievements for this period.
          </p>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <InputField
                key={n}
                type="text"
                label={`Accomplishment ${n}`}
                required
                value={form[`accomplishment${n}` as keyof typeof form]}
                onChange={(e) =>
                  handleChange(`accomplishment${n}`, e.target.value)
                }
                placeholder={`Describe accomplishment ${n}...`}
              />
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            icon={XIcon}
            variant="danger"
            type="button"
            onClick={() => router.back()}
          />
          <Button
            variant={isEditMode ? "warning" : "success"}
            label={loading ? "Saving..." : isEditMode ? "Update" : "Create"}
            icon={isEditMode ? EditIcon : NewspaperIcon}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
