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
      selector: (row: any) => row.departmentId.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: any) => row.designationId.name,
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
    { name: "Card Number", selector: (row: any) => row.cardNumber },
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
    <section>
      <div className="flex flex-row justify-between py-2 items-center">
        <h1 className="text-xl md:text-2xl font-bold">Digital Wallet</h1>
        <Button
          className="text-xs md:text-lg"
          label="Add Employee"
          icon={PlusCircleIcon}
          iconSize={28}
          variant="success"
          onClick={() => router.push("/employee/create")}
        />
      </div>

      <div className="rounded-xl shadow-xl">
        <DataTable
          className="font-sans "
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
    </section>
  );
}
