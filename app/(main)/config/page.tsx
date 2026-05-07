"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllDepartment } from "@/actions/departmentActions";
import { getAllDesignation } from "@/actions/designationActions";
import { getAllRole } from "@/actions/roleActions";
import type { Department } from "@/models/employee/department";
import type { Designation } from "@/models/employee/designation";
import type { Role } from "@/models/employee/role"; // Ensure this import exists
import DataTable from "react-data-table-component";
import Button from "@/components/UI/Button";
import { PlusCircleIcon, EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import FilterTable from "@/components/UI/FilterTable";

export default function ConfigPage() {
  const router = useRouter();
  const [departmentRows, setDepartmentRows] = useState<Department[]>([]);
  const [designationRows, setDesignationRows] = useState<Designation[]>([]);
  const [roleRows, setRoleRows] = useState<Role[]>([]); // Fixed type to Role[]
  const [loading, setLoading] = useState(true);

  // --- Column Definitions ---
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
      cell: (row: Department) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${row.status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
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
      selector: (row: Designation) => row.departmentId?.shortName,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: Designation) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${row.status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
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

  const roleColumns = [
    { name: "Code", selector: (row: Role) => row.code, sortable: true },
    { name: "Name", selector: (row: Role) => row.name, sortable: true },
    {
      name: "Short Name",
      selector: (row: Role) => row.shortName,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: Role) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${row.status ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Role) => (
        <Button
          label="Edit"
          icon={EditIcon}
          variant="info"
          className="scale-75"
          onClick={() => router.push(`/role/edit/${row._id}`)}
        />
      ),
    },
  ];

  // --- Fetch Logic ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [depRes, desRes, roleRes] = await Promise.all([
          getAllDepartment(),
          getAllDesignation(),
          getAllRole(),
        ]);

        if (depRes.success) setDepartmentRows(depRes.data || []);
        if (desRes.success) setDesignationRows(desRes.data || []);
        if (roleRes.success) setRoleRows(roleRes.data || []); // FIXED: Was setting to DesignationRows
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Filter States ---
  const [depFilterText, setDepFilterText] = useState("");
  const [desFilterText, setDesFilterText] = useState("");
  const [roleFilterText, setRoleFilterText] = useState("");

  // --- Filter Logics ---
  const filteredDepartments = useMemo(() => {
    return departmentRows.filter(
      (item) =>
        item.name?.toLowerCase().includes(depFilterText.toLowerCase()) ||
        item.shortName?.toLowerCase().includes(depFilterText.toLowerCase()) ||
        item.code?.toLowerCase().includes(depFilterText.toLowerCase()),
    );
  }, [departmentRows, depFilterText]);

  const filteredDesignations = useMemo(() => {
    return designationRows.filter(
      (item) =>
        item.name?.toLowerCase().includes(desFilterText.toLowerCase()) ||
        item.code?.toLowerCase().includes(desFilterText.toLowerCase()),
    );
  }, [designationRows, desFilterText]);

  const filteredRoles = useMemo(() => {
    return roleRows.filter(
      (item) =>
        item.name?.toLowerCase().includes(roleFilterText.toLowerCase()) ||
        item.shortName?.toLowerCase().includes(roleFilterText.toLowerCase()) ||
        item.code?.toLowerCase().includes(roleFilterText.toLowerCase()),
    );
  }, [roleRows, roleFilterText]); // FIXED: Was using departmentRows/depFilterText dependencies

  return (
    <div className="p-4 space-y-8">
      {/* Departments Section */}
      <section>
        <div className="flex flex-row justify-end py-2">
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
            data={filteredDepartments}
            pagination
            progressPending={loading}
            progressComponent={<Loading />}
            subHeader
            subHeaderComponent={
              <div className="flex items-center justify-between w-full py-2">
                <h1 className="text-xl font-bold">Departments</h1>
                <FilterTable
                  onFilter={(e) => setDepFilterText(e.target.value)}
                  onClear={() => setDepFilterText("")}
                  filterText={depFilterText}
                  placeholder="Filter Departments"
                />
              </div>
            }
          />
        </div>
      </section>

      {/* Designations Section */}
      <section>
        <div className="flex flex-row justify-end py-2">
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
            data={filteredDesignations}
            pagination
            progressPending={loading}
            progressComponent={<Loading />}
            subHeader
            subHeaderComponent={
              <div className="flex items-center justify-between w-full py-2">
                <h1 className="text-xl font-bold">Designations</h1>
                <FilterTable
                  onFilter={(e) => setDesFilterText(e.target.value)}
                  onClear={() => setDesFilterText("")}
                  filterText={desFilterText}
                  placeholder="Filter Designations"
                />
              </div>
            }
          />
        </div>
      </section>

      {/* Roles Section */}
      <section>
        <div className="flex flex-row justify-end py-2">
          <Button
            label="Add Role"
            icon={PlusCircleIcon}
            variant="success"
            onClick={() => router.push("/role/create")}
          />
        </div>
        <div className="rounded-xl shadow-lg border overflow-hidden">
          <DataTable
            columns={roleColumns}
            data={filteredRoles}
            pagination
            progressPending={loading}
            progressComponent={<Loading />}
            subHeader
            subHeaderComponent={
              <div className="flex items-center justify-between w-full py-2">
                <h1 className="text-xl font-bold">Roles</h1>
                <FilterTable
                  onFilter={(e) => setRoleFilterText(e.target.value)}
                  onClear={() => setRoleFilterText("")}
                  filterText={roleFilterText}
                  placeholder="Filter Roles"
                />
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
}
