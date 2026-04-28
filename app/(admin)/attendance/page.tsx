"use client";
import DataTable from "react-data-table-component";
import React from "react";

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
      <h1>Attendance</h1>
      <DataTable columns={columns} data={data} pagination />
    </div>
  );
}
