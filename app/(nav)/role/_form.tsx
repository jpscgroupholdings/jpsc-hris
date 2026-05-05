"use client";

import { useState, useEffect } from "react";
import Button from "@/components/UI/Button";
import InputField from "@/components/UI/InputField";
import { toast } from "sonner";
import { SaveIcon, EditIcon } from "lucide-react";

interface RoleFormProps {
  initialData?: {
    _id?: string;
    code: string;
    name: string;
    shortName: string;
    status: boolean;
  };
  onSuccess: () => void;
}

export default function RoleForm({ initialData, onSuccess }: RoleFormProps) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    shortName: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData?._id;

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || "",
        name: initialData.name || "",
        shortName: initialData.shortName || "",
        status: initialData.status ?? true,
      });
    }
  }, [initialData]);

  const validate = () => {
    if (!formData.code || !formData.name || !formData.shortName) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const url = isEditMode
        ? `/api/employee/role/${initialData._id}`
        : "/api/employee/role/";
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to save role");

      toast.success(`Role ${isEditMode ? "updated" : "created"} successfully`);
      onSuccess();

      if (!isEditMode) {
        setFormData({ code: "", name: "", shortName: "", status: true });
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">
        {isEditMode ? "Edit Role" : "Add New Role"}
      </h2>

      <InputField
        type="text"
        label="Role Code"
        placeholder="e.g. IT, HR, FIN"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
      />

      <InputField
        label="Full Name"
        type="text"
        placeholder="e.g. Information Technology"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <InputField
        label="Short Name"
        type="text"
        placeholder="e.g. InfoTech"
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
        />
        <label htmlFor="status" className="text-sm font-medium">
          Active Status
        </label>
      </div>

      <Button
        label={
          loading ? "Saving..." : isEditMode ? "Update Role" : "Create Role"
        }
        variant={isEditMode ? "warning" : "success"}
        icon={isEditMode ? EditIcon : SaveIcon}
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
}
