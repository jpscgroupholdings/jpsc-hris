"use client";

import { useState, useEffect } from "react";
import Button from "@/components/UI/Button";
import InputField from "@/components/UI/InputField";
import SearchSelect, { SearchSelectOption } from "@/components/UI/SelectField";
import { toast } from "sonner";
import { SaveIcon, EditIcon } from "lucide-react";
import { getAllDepartment } from "@/actions/departmentActions";

interface DesignationFormProps {
  initialData?: {
    _id?: string;
    code: string;
    name: string;
    shortName: string;
    departmentId: any;
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
    departmentId: "",
    status: true,
  });

  const isEditMode = !!initialData?._id;

  useEffect(() => {
    const fetchDeps = async () => {
      const res = await getAllDepartment();
      if (res.success) setDepartments(res.data);
    };
    fetchDeps();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code,
        name: initialData.name,
        shortName: initialData.shortName,
        departmentId:
          initialData.departmentId?._id || initialData.departmentId || "",
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!formData.code || !formData.name || !formData.departmentId) {
      return toast.error("Please fill in all required fields");
    }

    try {
      setLoading(true);
      const url = isEditMode
        ? `/api/employee/designation/${initialData._id}`
        : "/api/employee/designation";
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
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
      />

      <InputField
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <SearchSelect
        label="Department"
        options={departments.map((dep) => ({
          value: dep._id,
          label: dep.name,
          description: dep.code,
        }))}
        value={formData.departmentId}
        onChange={(val) =>
          setFormData({ ...formData, departmentId: val || "" })
        }
        placeholder="Select Department"
      />

      <InputField
        label="Short Name"
        type="text"
        value={formData.shortName}
        onChange={(e) =>
          setFormData({ ...formData, shortName: e.target.value })
        }
      />

      <div className="flex items-center gap-2 py-2">
        <input
          type="checkbox"
          id="status"
          checked={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.checked })
          }
          className="w-4 h-4 rounded border-gray-300 text-jpsc-500 focus:ring-jpsc-500"
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
