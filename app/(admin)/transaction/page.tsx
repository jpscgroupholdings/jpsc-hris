"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import Loading from "@/components/Loading"; // Assuming you have this from the Employee page

export default function Transaction() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      name: "Employee",
      selector: (row: any) => row.user,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount,
      cell: (row: any) => row.amount?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
      format: (row: any) =>
        row.date ? format(new Date(row.date), "MMM dd, yyyy") : "N/A",
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        // Ensure this endpoint matches your actual Transaction API route
        const res = await fetch("/api/transaction/txn");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={data}
          pagination
          progressPending={pending}
          progressComponent={<Loading />}
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
}
