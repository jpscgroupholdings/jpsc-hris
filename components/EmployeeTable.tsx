"use client";
import React, { useState, useMemo } from "react";
import { employees, Employee } from "@/lib/mockData";
import { MapPin, Filter } from "lucide-react";

interface Props {
  searchQuery?: string;
  limit?: number;
  title?: string;
}

const EmployeeTable: React.FC<Props> = ({
  searchQuery = "",
  limit,
  title = "Today's Attendance",
}) => {
  const [dept, setDept] = useState("All");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "in" | "out" | "break"
  >("all");

  const departments = [
    "All",
    ...Array.from(new Set(employees.map((e) => e.department))),
  ];

  const filtered = useMemo(() => {
    let list: Employee[] = employees;
    if (dept !== "All") list = list.filter((e) => e.department === dept);
    if (statusFilter !== "all")
      list = list.filter((e) => e.status === statusFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q),
      );
    }
    return limit ? list.slice(0, limit) : list;
  }, [dept, statusFilter, searchQuery, limit]);

  const statusBadge = (s: Employee["status"]) => {
    if (s === "in") return "bg-emerald-500 text-jpsc-50 border-emerald-500";
    if (s === "break") return "bg-amber-500 text-jpsc-50 border-amber-500";
    return "bg-slate-500 text-jpsc-50 border-slate-500";
  };

  return (
    <div className="bg-jpsc-900 border border-jpsc-500 shadow-md shadow-jpsc-100 rounded-2xl overflow-hidden">
      <div className="flex flex-col bg-jpsc-500 sm:flex-row sm:items-center sm:justify-between gap-3 p-5">
        <div>
          <h2 className="text-jpsc-950 font-semibold text-2xl">{title}</h2>
          <p className="text-jpsc-800 text-xs mt-0.5">
            {filtered.length} records · Updated just now
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1">
            {(["all", "in", "break", "out"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition ${
                  statusFilter === s
                    ? "bg-background text-jpsc-500"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {s === "all"
                  ? "All"
                  : s === "in"
                    ? "Present"
                    : s === "break"
                      ? "Break"
                      : "Checked out"}
              </button>
            ))}
          </div>
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="bg-slate-950 text-slate-400 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-sky-500/50"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-jpsc-200 text-slate-950 text-xs uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-medium">Employee</th>
              <th className="text-left px-5 py-3 font-medium hidden md:table-cell">
                Department
              </th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">
                Check-in
              </th>
              <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">
                Check-out
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr
                key={emp.id}
                className="border-t border-background 
             odd:bg-jpsc-200 even:bg-jpsc-300 
             dark:odd:bg-jpsc-800 dark:even:bg-jpsc-900 
             hover:bg-amber-400 dark:hover:bg-jpsc-200 
             transition group"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-9 h-9 rounded-full ring-2 ring-slate-800"
                    />
                    <div>
                      <p className="text-foreground group-hover:text-background font-medium">
                        {emp.name}
                      </p>
                      <p className="text-foreground group-hover:text-background text-xs">
                        {emp.id} · {emp.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className="text-foreground group-hover:text-background">
                    {emp.department}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge("in")}`}
                  >
                    <span className={"w-1.5 h-1.5 rounded-full "} />
                    {emp.status === "in"
                      ? "Present"
                      : emp.status === "break"
                        ? "On Break"
                        : "Checked out"}
                  </span>
                </td>
                <td className="px-5 py-3 text-foreground group-hover:text-background font-mono text-xs hidden sm:table-cell">
                  {emp.checkIn}
                </td>
                <td className="px-5 py-3 text-foreground group-hover:text-background font-mono text-xs hidden sm:table-cell">
                  {emp.checkOut}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-500">
                  No employees match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
