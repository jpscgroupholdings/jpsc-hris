"use client";

import { useEffect, useState } from "react";
import { getAllDepartment } from "@/actions/departmentActions";
import { getAllDesignation } from "@/actions/designationActions";
import type { Department } from "@/models/department";
import type { Designation } from "@/models/designation";
import DataTable from "react-data-table-component";
import Button from "@/components/UI/Button";
import { PlusCircleIcon, EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function ConfigPage() {
  const router = useRouter();
  const [departmentRows, setDepartmentRows] = useState<Department[]>([]);
  const [designationRows, setDesignationRows] = useState<Designation[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Column Definitions with Edit Buttons ---
  const departmentColumns = [
    { name: "Code", selector: (row: Department) => row.code, sortable: true },
    { name: "Name", selector: (row: Department) => row.name, sortable: true },
    {
      name: "Short Name",
      selector: (row: Department) => row.shortName,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Department) => (row.status ? "Active" : "Inactive"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Department) => (
        <Button
          label="Edit"
          icon={EditIcon}
          variant="info"
          className="scale-75"
          onClick={() => router.push(`/department/edit/${row._id}`)}
        />
      ),
    },
  ];

  const designationColumns = [
    { name: "Code", selector: (row: Designation) => row.code, sortable: true },
    { name: "Name", selector: (row: Designation) => row.name, sortable: true },
    {
      name: "Department",
      selector: (row: Designation) => row.departmentId?.shortName || "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: Designation) => (row.status ? "Active" : "Inactive"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Designation) => (
        <Button
          label="Edit"
          icon={EditIcon}
          variant="info"
          className="scale-75"
          onClick={() => router.push(`/designation/edit/${row._id}`)}
        />
      ),
    },
  ];

  // --- Fetch Logic ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [depRes, desRes] = await Promise.all([
          getAllDepartment(),
          getAllDesignation(),
        ]);

        if (depRes.success) setDepartmentRows(depRes.data || []);
        if (desRes.success) setDesignationRows(desRes.data || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {/* Departments Section */}
      <div>
        <div className="flex flex-row justify-between py-2 items-center">
          <h1 className="text-xl md:text-2xl font-bold">Departments</h1>
          <Button
            label="Add Department"
            icon={PlusCircleIcon}
            variant="success"
            onClick={() => router.push("/department/create")}
          />
        </div>
        <div className="rounded-xl shadow-lg border overflow-hidden">
          <DataTable
            columns={departmentColumns}
            data={departmentRows}
            pagination
            progressPending={loading}
            progressComponent={<Loading />}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>

      {/* Designations Section */}
      <div>
        <div className="flex flex-row justify-between py-2 items-center">
          <h1 className="text-xl md:text-2xl font-bold">Designations</h1>
          <Button
            label="Add Designation"
            icon={PlusCircleIcon}
            variant="success"
            onClick={() => router.push("/designation/create")}
          />
        </div>
        <div className="rounded-xl shadow-lg border overflow-hidden">
          <DataTable
            columns={designationColumns}
            data={designationRows}
            pagination
            progressPending={loading}
            progressComponent={<Loading />}
            highlightOnHover
            pointerOnHover
          />
        </div>
      </div>
    </section>
  );
}
