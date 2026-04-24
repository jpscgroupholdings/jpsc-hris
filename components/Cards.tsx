"use client";
import React from "react";
import {
  Users,
  UserCheck,
  DoorOpen,
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { employees } from "@/lib/mockData";

export default function Cards() {
  const present = employees.filter(
    (e) => e.status === "in" || e.status === "break",
  ).length;
  //   const totalBalance = employees.reduce((s, e) => s + e.balance, 0);

  const stats = [
    {
      label: "Employees Present",
      value: present,
      sub: "Mema",
      total: employees.length,
      change: "+4.2%",
      trend: "up",
      icon: UserCheck,
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/20",
    },
    {
      label: "Total Workforce",
      value: employees.length,
      sub: `${employees.filter((e) => e.accessLevel === "Full").length} admins`,
      change: "+2 this week",
      trend: "up",
      icon: Users,
      gradient: "from-sky-500 to-blue-600",
      shadow: "shadow-sky-500/20",
    },
    {
      label: "Access Events Today",
      value: "1,247",
      sub: "8 denied",
      change: "+12.5%",
      trend: "up",
      icon: DoorOpen,
      gradient: "from-violet-500 to-purple-600",
      shadow: "shadow-violet-500/20",
    },
    {
      label: "Wallet Balance",
      value: "1000",
      sub: "Across all employees",
      change: "-3.1%",
      trend: "down",
      icon: Wallet,
      gradient: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        const Trend = s.trend === "up" ? TrendingUp : TrendingDown;
        return (
          <div
            key={s.label}
            className="relative overflow-hidden bg-background border-2 border-jpsc-800 rounded-2xl p-5 hover:bg-jpsc-100 hover:text-background transition group"
          >
            <div
              className={
                "absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20  transition"
              }
            />
            <div className="flex items-start justify-between">
              <div
                className={
                  "w-11 h-11 rounded-xl bg-jpsc-500  flex items-center justify-center shadow-lg "
                }
              >
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${
                  s.trend === "up"
                    ? "bg-emerald-500 text-foreground"
                    : "bg-rose-400 text-foreground"
                }`}
              >
                <Trend className="w-3 h-3" />
                {s.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-foreground text-sm dark:group-hover:text-background">
                {s.label}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-bold text-foreground dark:group-hover:text-background">
                  10000
                </h3>
                {s.total && (
                  <span className="text-foreground text-sm dark:group-hover:text-background">
                    / {s.total}
                  </span>
                )}
              </div>
              {s.sub && (
                <p className="text-foreground text-xs mt-1 dark:group-hover:text-background">
                  {s.sub}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
