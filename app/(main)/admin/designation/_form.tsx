"use client";

import { useState, useEffect } from "react";
import Button from "@/components/UI/Button";
import InputField from "@/components/UI/InputField";
import { SearchSelect } from "@/components/UI/SelectField";
import { toast } from "sonner";
import { SaveIcon, EditIcon } from "lucide-react";
import { getAllDepartment } from "@/actions/admin/departmentActions";

interface DesignationFormProps {
  initialData?: {
    _id?: string;
    code: string;
    name: string;
    shortName: string;
    responsibility1: string;
    responsibility2: string;
    responsibility3: string;
    responsibility4: string;
    responsibility5: string;
    responsibility6: string;
    responsibility7: string;
    responsibility8: string;
    responsibility9: string;
    responsibility10: string;
    responsibility11: string;
    responsibility12: string;
    departmentId: string;
    status: boolean;
  };
  onSuccess: () => void;
}

export default function DesignationForm({
  initialData,
  onSuccess,
}: DesignationFormProps) {
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    shortName: "",
    responsibility1: "",
    responsibility2: "",
    responsibility3: "",
    responsibility4: "",
    responsibility5: "",
    responsibility6: "",
    responsibility7: "",
    responsibility8: "",
    responsibility9: "",
    responsibility10: "",
    responsibility11: "",
    responsibility12: "",
    departmentId: "",
    status: true,
  });

  const isEditMode = !!initialData?._id;

  useEffect(() => {
    const fetchDeps = async () => {
      const res = await getAllDepartment();
      if (res.success) {
        setDepartments(res.data);

        if (initialData) {
          setFormData({
            code: initialData.code ?? "",
            name: initialData.name ?? "",
            shortName: initialData.shortName ?? "",
            responsibility1: initialData.responsibility1 ?? "",
            responsibility2: initialData.responsibility2 ?? "",
            responsibility3: initialData.responsibility3 ?? "",
            responsibility4: initialData.responsibility4 ?? "",
            responsibility5: initialData.responsibility5 ?? "",
            responsibility6: initialData.responsibility6 ?? "",
            responsibility7: initialData.responsibility7 ?? "",
            responsibility8: initialData.responsibility8 ?? "",
            responsibility9: initialData.responsibility9 ?? "",
            responsibility10: initialData.responsibility10 ?? "",
            responsibility11: initialData.responsibility11 ?? "",
            responsibility12: initialData.responsibility12 ?? "",
            departmentId:
              (initialData.departmentId as any)?._id?.toString() ?? "",
            status: initialData.status ?? true,
          });
        }
      }
    };
    fetchDeps();
  }, [initialData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.code || !formData.name || !formData.departmentId) {
      return toast.error("Please fill in all required fields");
    }

    try {
      setLoading(true);
      const url = isEditMode
        ? `/api/admin/designation/${initialData._id}`
        : "/api/admin/designation";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to save designation");

      toast.success(`Designation ${isEditMode ? "updated" : "created"}`);
      onSuccess();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        {isEditMode ? "Edit Designation" : "Add New Designation"}
      </h2>

      <InputField
        label="Designation Code"
        type="text"
        placeholder="Designation Code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
      />

      <InputField
        label="Full Name"
        type="text"
        placeholder="Designation Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {departments.length > 0 ? (
        <SearchSelect
          label="Department"
          options={departments.map((dep) => ({
            value: dep._id.toString(),
            label: dep.name,
            description: dep.code,
          }))}
          value={formData.departmentId}
          onChange={(val) =>
            setFormData({ ...formData, departmentId: val || "" })
          }
          placeholder="Select Department"
        />
      ) : (
        <p className="text-sm text-gray-400">Loading departments...</p>
      )}

      <InputField
        label="Short Name"
        type="text"
        placeholder="Designation Short Name"
        value={formData.shortName}
        onChange={(e) =>
          setFormData({ ...formData, shortName: e.target.value })
        }
      />

      <div className="flex flex-col mt-6 gap-6">
        {/* Critical Responsibilities */}
        <div className="flex flex-col rounded-xl border border-red-500 overflow-hidden">
          <span className="text-white bg-red-500 text-xl font-sans text-center py-1">
            Critical
          </span>
          <div className="p-3 space-y-4">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 1
                </label>
                <textarea
                  value={formData.responsibility1}
                  onChange={(e) =>
                    handleInputChange("responsibility1", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 2
                </label>
                <textarea
                  value={formData.responsibility2}
                  onChange={(e) =>
                    handleInputChange("responsibility2", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 3
                </label>
                <textarea
                  value={formData.responsibility3}
                  onChange={(e) =>
                    handleInputChange("responsibility3", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 4
                </label>
                <textarea
                  value={formData.responsibility4}
                  onChange={(e) =>
                    handleInputChange("responsibility4", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Very Important Responsibilities */}
        <div className="flex flex-col rounded-xl border border-orange-500 overflow-hidden">
          <span className="text-white bg-orange-500 text-xl font-sans text-center py-1">
            Very Important
          </span>
          <div className="p-3 space-y-4">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 5
                </label>
                <textarea
                  value={formData.responsibility5}
                  onChange={(e) =>
                    handleInputChange("responsibility5", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 6
                </label>
                <textarea
                  value={formData.responsibility6}
                  onChange={(e) =>
                    handleInputChange("responsibility6", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 7
                </label>
                <textarea
                  value={formData.responsibility7}
                  onChange={(e) =>
                    handleInputChange("responsibility7", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 8
                </label>
                <textarea
                  value={formData.responsibility8}
                  onChange={(e) =>
                    handleInputChange("responsibility8", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Important Responsibilities */}
        <div className="flex flex-col rounded-xl border border-yellow-500 overflow-hidden">
          <span className="text-white bg-yellow-500 text-xl font-sans text-center py-1">
            Important
          </span>
          <div className="p-3 space-y-4">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 9
                </label>
                <textarea
                  value={formData.responsibility9}
                  onChange={(e) =>
                    handleInputChange("responsibility9", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 10
                </label>
                <textarea
                  value={formData.responsibility10}
                  onChange={(e) =>
                    handleInputChange("responsibility10", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 11
                </label>
                <textarea
                  value={formData.responsibility11}
                  onChange={(e) =>
                    handleInputChange("responsibility11", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility 12
                </label>
                <textarea
                  value={formData.responsibility12}
                  onChange={(e) =>
                    handleInputChange("responsibility12", e.target.value)
                  }
                  placeholder="Job Responsibility..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 py-2">
        <input
          type="checkbox"
          id="status"
          checked={formData.status}
          onChange={(e) => handleInputChange("status", e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Active Status
        </label>
      </div>

      <Button
        label={loading ? "Saving..." : isEditMode ? "Update" : "Save"}
        variant={isEditMode ? "warning" : "success"}
        icon={isEditMode ? EditIcon : SaveIcon}
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
}
