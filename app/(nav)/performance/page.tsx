"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { toast } from "sonner";
import {
  PlusIcon,
  EditIcon,
  Trash2Icon,
  SearchIcon,
  NewspaperIcon,
} from "lucide-react";
import Button from "@/components/UI/Button";
import InputField from "@/components/UI/InputField";

export default function AccomplishmentListPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAccomplishments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/performance/accomplishment");
      const json = await res.json();
      if (res.ok) {
        setData(json.data);
      } else {
        toast.error(json.error || "Failed to fetch data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching accomplishments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccomplishments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`/api/performance/accomplishment/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Record deleted");
        fetchAccomplishments(); // Refresh list
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Error deleting record");
    }
  };

  const filteredData = data.filter((item: any) => {
    const fullName =
      `${item.userId?.firstName} ${item.userId?.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const columns = [
    {
      name: "Employee",
      selector: (row: any) =>
        `${row.userId?.firstName} ${row.userId?.lastName}`,
      sortable: true,
      cell: (row: any) => (
        <div>
          <div className="font-semibold text-gray-900">
            {row.userId?.firstName} {row.userId?.lastName}
          </div>
          <div className="text-xs text-gray-500">{row.userId?.email}</div>
        </div>
      ),
    },
    {
      name: "Position / Dept",
      selector: (row: any) => row.userId?.designationId?.name,
      cell: (row: any) => (
        <div>
          <div className="text-sm">{row.userId?.designationId?.name}</div>
          <div className="text-xs text-gray-400">
            {row.userId?.departmentId?.name}
          </div>
        </div>
      ),
    },
    {
      name: "Period",
      selector: (row: any) => row.dateStart,
      cell: (row: any) => (
        <div className="text-xs">
          {new Date(row.dateStart).toLocaleDateString()} -{" "}
          {new Date(row.dateEnd).toLocaleDateString()}
        </div>
      ),
    },
    {
      name: "Accomplishments",
      grow: 2,
      cell: (row: any) => (
        <ul className="list-disc text-[11px] py-2 text-gray-600">
          <li className="truncate max-w-50">{row.accomplishment1}</li>
          <li className="truncate max-w-50">{row.accomplishment2}</li>
        </ul>
      ),
    },
    {
      name: "Actions",
      right: true,
      cell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              router.push(`/performance/accomplishment/edit/${row._id}`)
            }
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <EditIcon size={18} />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2Icon size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <NewspaperIcon className="text-blue-600" />
            Accomplishment Reports
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track employee performance records.
          </p>
        </div>
        <Button
          variant="success"
          label="New Accomplishment"
          icon={PlusIcon}
          onClick={() => router.push("/performance/accomplishment/create")}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="max-w-sm flex-1">
            {/* <InputField
              placeholder="Search by employee name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={SearchIcon}
            /> */}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          progressPending={loading}
          highlightOnHover
          responsive
          // customStyles={{
          //   headCells: {
          //     style: {
          //       backgroundColor: "#f9fafb",
          //       fontWeight: "600",
          //       color: "#4b5563",
          //       textTransform: "uppercase",
          //       fontSize: "0.75rem",
          //     },
          //   },
          //   rows: {
          //     style: {
          //       minHeight: "72px",
          //     },
          //   },
          // }}
        />
      </div>
    </div>
  );
}
