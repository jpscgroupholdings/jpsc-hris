// "use client";

// import { useState, useEffect } from "react";
// import Button from "@/components/UI/Button";
// import InputField from "@/components/UI/InputField";
// import { toast } from "sonner";
// import { SaveIcon, EditIcon } from "lucide-react";

// interface Props {
//   initialData?: any;
//   onSuccess: () => void;
// }

// export default function DepartmentForm({ initialData, onSuccess }: Props) {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     code: "",
//     name: "",
//     shortName: "",
//     status: true,
//   });

//   const isEditMode = !!initialData?._id;

//   // Sync data when initialData is loaded
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         code: initialData.code || "",
//         name: initialData.name || "",
//         shortName: initialData.shortName || "",
//         status: initialData.status ?? true,
//       });
//     }
//   }, [initialData]);

//   const handleSubmit = async () => {
//     if (!formData.code || !formData.name) {
//       return toast.error("Required fields are missing");
//     }

//     try {
//       setLoading(true);
//       // Logic: If edit, PUT to /[id]. If create, POST to /
//       const url = isEditMode
//         ? `/api/departments/${initialData._id}`
//         : "/api/departments";
//       const method = isEditMode ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to save department");

//       toast.success(`Department ${isEditMode ? "updated" : "created"}`);
//       onSuccess();
//     } catch (err: any) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg space-y-4 border p-6 rounded-xl bg-white shadow-sm">
//       <h1 className="text-2xl font-bold">
//         {isEditMode ? "Edit Department" : "Add Department"}
//       </h1>

//       <InputField
//         label="Code"
//         type="text"
//         value={formData.code}
//         onChange={(e) => setFormData({ ...formData, code: e.target.value })}
//       />
//       <InputField
//         label="Full Name"
//         type="text"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//       />
//       <InputField
//         label="Short Name"
//         type="text"
//         value={formData.shortName}
//         onChange={(e) =>
//           setFormData({ ...formData, shortName: e.target.value })
//         }
//       />

//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           checked={formData.status}
//           onChange={(e) =>
//             setFormData({ ...formData, status: e.target.checked })
//           }
//         />
//         <label className="text-sm">Active</label>
//       </div>

//       <Button
//         label={loading ? "Saving..." : isEditMode ? "Update" : "Save"}
//         icon={isEditMode ? EditIcon : SaveIcon}
//         variant="success"
//         onClick={handleSubmit}
//         disabled={loading}
//       />
//     </div>
//   );
// }
