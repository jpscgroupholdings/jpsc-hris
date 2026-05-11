"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { getTotalUser } from "@/actions/employee/userActions";
import { toast } from "sonner";
import { Users } from "lucide-react";

export default function Dashboard() {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await getTotalUser();
        setUsersCount(count);
      } catch (error) {
        toast.error("Failed to load user count");
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, []);

  return (
    <div className="flex flex-col gap-7 p-6">
      {/* Correct JSX Syntax: 
          propName={value}
      */}
      <Card
        title="Total Employees"
        content={loading ? "..." : usersCount.toString()}
        description="Current Total JPSC Employees"
        fromColor="#1e3a8a" // deep blue
        toColor="#3b82f6"
        linkText="View all employees"
        linkPath="/employee/user"
        icon={Users}
      />
    </div>
  );
}
