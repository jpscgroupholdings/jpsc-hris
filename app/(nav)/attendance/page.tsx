"use client";
import DataTable from "react-data-table-component";
import Loading from "@/components/Loading";

export default function Attendance() {
  const columns = [
    { name: "Employee", selector: (row: any) => row.employee },
    { name: "Deparment" },
    { name: "Time In" },
    { name: "Time Out" },
  ];

  const data = [{}];
  return (
    <div>
      {/* <h1>Attendance</h1> */}
      <div className="rounded-xl shadow-lg border overflow-hidden">
        <DataTable
          title="Employeess"
          className="font-sans"
          columns={columns}
          data={data}
          pagination
          fixedHeader
          // progressPending={pending}
          progressComponent={<Loading />}
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
}
