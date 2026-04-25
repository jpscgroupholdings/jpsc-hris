"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import Loading from "@/components/Loading"; // Assuming you have this from the Employee page
import Button from "@/components/UI/Button";
import { BanknoteArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Transaction() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const router = useRouter();

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
    <div>
      <div className="flex flex-row justify-between py-2 my-2 items-center">
        <h1 className="text-sm md:text-2xl font-bold">Transactions</h1>
        <Button
          className="text-xs md:text-lg"
          label="Top Up Wallet"
          icon={BanknoteArrowUpIcon}
          variant="success"
          onClick={() => router.push("/transaction/create")}
        />
      </div>

      <div className="rounded-xl shadow-xl">
        <DataTable
          className="font-sans"
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
