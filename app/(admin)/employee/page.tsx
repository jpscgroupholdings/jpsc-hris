"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Button from "@/components/UI/Button";
import { PlusCircleIcon } from "lucide-react";
import Loading from "@/components/Loading";
import { format } from "date-fns";

export default function Employee() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      name: "First Name",
      selector: (row: any) => row.firstName + " " + row.lastName,
      sortable: true,
    },
    {
      name: "Department",
      // Accessing the name property from the populated object
      selector: (row: any) =>
        typeof row.department === "string"
          ? row.department
          : row.department?.name,
      sortable: true,
    },
    {
      name: "Role",
      // Accessing the name property from the populated object
      selector: (row: any) =>
        typeof row.role === "string" ? row.role : row.role?.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row: any) => row.username,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row: any) => row.mobileNumber,
      sortable: true,
    },
    {
      name: "Birthday",
      selector: (row: any) =>
        row.birthDate ? format(new Date(row.birthDate), "MMM/dd/yyyy") : "N/A",
      sortable: true,
    },
    { name: "Balance", selector: (row: any) => row.balance },
    { name: "Card Number", selector: (row: any) => row._id },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/employee/user");
        const json = await res.json();
        setData(json);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Employee</h1>

      <Button
        className="text-sm"
        label="Add Employee"
        icon={PlusCircleIcon}
        variant="info"
        onClick={() => router.push("/employee/create")}
      />

      <DataTable
        columns={columns}
        data={data}
        pagination
        fixedHeader
        progressPending={pending}
        progressComponent={<Loading />}
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
}
