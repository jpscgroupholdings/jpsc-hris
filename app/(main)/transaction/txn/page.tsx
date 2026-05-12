"use client";

import { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import Loading from "@/components/Loading";
import Button from "@/components/UI/Button";
import { BanknoteArrowUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterTable from "@/components/UI/FilterTable";
import { Txn } from "@/models/transaction/txn";

export default function Transaction() {
  const router = useRouter();
  const [txnRows, setTxnRows] = useState<Txn[]>([]);
  const [pending, setPending] = useState(true);
  const [txnFilterText, setTxnFilterText] = useState("");

  const columns = [
    {
      name: "Employee",
      selector: (row: Txn) => row.userId.name || "N/A",
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: Txn) => row.amount,
      cell: (row: Txn) => row.amount?.toLocaleString(),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Txn) => row.description,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.txnDate,
      format: (row: any) =>
        row.txnDate ? format(new Date(row.txnDate), "MMM dd, yyyy") : "N/A",
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);
        const res = await fetch("/api/transaction/txn");
        const json = await res.json();
        setTxnRows(Array.isArray(json) ? json : json.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setPending(false);
      }
    };

    fetchData();
  }, []);

  // --- Filter Logic ---
  const filteredTransactions = useMemo(() => {
    const lowerText = txnFilterText.toLowerCase();
    return txnRows.filter(
      (item) =>
        item.description?.toLowerCase().includes(lowerText) ||
        item.userId.name.toLowerCase().includes(lowerText) ||
        format(new Date(item.txnDate), "MMM dd, yyyy")
          .toLowerCase()
          .includes(lowerText),
    );
  }, [txnRows, txnFilterText]);

  return (
    <div>
      <div className="flex flex-row justify-end py-2 my-2 items-center">
        <Button
          className="text-xs md:text-lg"
          label="Top Up Wallet"
          icon={BanknoteArrowUpIcon}
          variant="success"
          onClick={() => router.push("/transaction/create")}
        />
      </div>

      <div className="rounded-xl shadow-lg border overflow-hidden">
        <DataTable
          className="font-sans"
          columns={columns}
          data={filteredTransactions}
          pagination
          progressPending={pending}
          progressComponent={<Loading />}
          highlightOnHover
          pointerOnHover
          fixedHeader
          fixedHeaderScrollHeight="600px"
          subHeader
          subHeaderWrap
          subHeaderComponent={
            <div className="flex items-center justify-between w-full py-2">
              <h1 className="text-md md:text-2xl font-sans font-bold">
                Transactions
              </h1>
              <FilterTable
                onFilter={(e) => setTxnFilterText(e.target.value)}
                onClear={() => setTxnFilterText("")}
                filterText={txnFilterText}
                placeholder="Search Transactions.."
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
