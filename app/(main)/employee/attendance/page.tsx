"use client";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loading from "@/components/Loading";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`/api/attendance/timeSheet/${today}`);
        const data = await response.json();
        setRecords(data);
        setPending(false);
      } catch (error) {
        console.error("Failed to fetch attendance:", error);
        setPending(false);
      }
    };

    fetchAttendance();
  }, []);

  const columns = [
    {
      name: "Employee",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: any) => row.department || "N/A",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Time In",
      // FIX: Only create a Date object if row.timeIn is not null
      selector: (row: any) => {
        return row.timeIn
          ? new Date(row.timeIn).toLocaleTimeString("en-PH", {
              timeZone: "Asia/Manila",
            })
          : "--:--";
      },
    },
    {
      name: "Time Out",
      selector: (row: any) => {
        return row.timeIn
          ? new Date(row.timeIn).toLocaleTimeString("en-PH", {
              timeZone: "Asia/Manila",
            })
          : "--:--";
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="rounded-xl shadow-lg border overflow-hidden">
        <DataTable
          title="Attendance Summary"
          className="font-sans"
          columns={columns}
          data={records}
          pagination
          fixedHeader
          progressPending={pending}
          progressComponent={<Loading />}
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
}
