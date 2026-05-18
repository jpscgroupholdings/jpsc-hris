"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import {
  getTotalUser,
  getTotalUserByShortName,
} from "@/actions/employee/userActions";
import { toast } from "sonner";
import { Users } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAll: 0,
    jpsc: 0,
    jpTech: 0,
    jpPro: 0,
    jpSon: 0,
    jpFood: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);

        const [
          allUsers,
          jpscUsers,
          jpTechUsers,
          jpProUsers,
          jpSonUsers,
          jpFoodUsers,
        ] = await Promise.all([
          getTotalUser(),
          getTotalUserByShortName("JPSC"),
          getTotalUserByShortName("JPTECH"),
          getTotalUserByShortName("JPPRO"),
          getTotalUserByShortName("JPSON"),
          getTotalUserByShortName("JPFOODLAB"),
        ]);

        setStats({
          totalAll: allUsers,
          jpsc: jpscUsers,
          jpTech: jpTechUsers,
          jpPro: jpProUsers,
          jpSon: jpSonUsers,
          jpFood: jpFoodUsers,
        });
      } catch (error) {
        console.error("Dashboard metric error:", error);
        toast.error("Failed to load some dashboard metrics");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
      {/* Total Card */}
      <Card
        title="Total Employees"
        content={loading ? "..." : stats.totalAll.toString()}
        fromColor="#1e3a8a"
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />

      {/* Digital One Card */}
      <Card
        title="Total Employees of Digital One"
        content={loading ? "..." : stats.jpsc.toString()}
        fromColor="#1e3a8a"
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />

      {/* JP Tech Card */}
      <Card
        title="Total Employees of JP Tech"
        content={loading ? "..." : stats.jpTech.toString()}
        fromColor="#1e3a8a"
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />

      {/* JP Pro Card */}
      <Card
        title="Total Employees of JP Pro"
        content={loading ? "..." : stats.jpPro.toString()}
        fromColor="#1e3a8a"
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />

      {/* JP Son Card */}
      <Card
        title="Total Employees of JP & Son"
        content={loading ? "..." : stats.jpSon.toString()}
        fromColor="#1e3a8a"
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />

      {/* JP Food Lab Card */}
      <Card
        title="Total Employees of JP Food Lab"
        content={loading ? "..." : stats.jpFood.toString()}
        fromColor="#1e3a8a"
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />
    </div>
  );
}
