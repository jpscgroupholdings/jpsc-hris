import AttendanceTable from "@/components/EmployeeTable";
import Cards from "@/components/Cards";
import React from "react";
import { redirect } from "next/navigation";

export default async function Admin() {
  redirect("/dashboard");
  return <div className="flex flex-col gap-7"></div>;
}
