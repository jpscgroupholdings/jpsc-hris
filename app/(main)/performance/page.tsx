"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import Button from "@/components/UI/Button";
import { EditIcon, PlusCircleIcon, Trash2Icon, ViewIcon } from "lucide-react";
import Loading from "@/components/Loading";
import { format } from "date-fns";
import FilterTable from "@/components/UI/FilterTable";
import { toast } from "sonner";
import { Evaluation } from "@/models/performance/evaluation";

export default function CombinedMonitoringPage() {
  const router = useRouter();

  const [evalData, setEvalData] = useState<any[]>([]);
  const [evalPending, setEvalPending] = useState(true);
  const [evalFilter, setEvalFilter] = useState("");

  const getScoreColor = (percent: number) => {
    if (percent <= 74) return "text-red-500";
    if (percent <= 84) return "text-yellow-500";
    return "text-green-500";
  };

  // --- Columns ---
  const evalColumns = [
    {
      name: "Employee",
      selector: (row: Evaluation) => row.userId.name,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: Evaluation) => row.userId?.departmentId?.name ?? "N/A",
      sortable: true,
    },
    {
      name: "Evaluated By",
      selector: (row: Evaluation) => row.evaluatedBy?.name ?? "N/A",
      sortable: true,
    },
    {
      name: "Period",
      selector: (row: Evaluation) => {
        const start = row.evaluationDateStart
          ? format(new Date(row.evaluationDateStart), "MMM dd, yyyy")
          : "N/A";
        const end = row.evaluationDateEnd
          ? format(new Date(row.evaluationDateEnd), "MMM dd, yyyy")
          : "N/A";
        return `${start} - ${end}`;
      },
      sortable: true,
    },
    {
      name: "Score",
      cell: (row: Evaluation) => (
        <span className={`font-semibold ${getScoreColor(row.finalPercent)}`}>
          {row.finalScore?.toFixed(2)} ({row.finalPercent}%)
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Evaluation) => (
        <div className="flex gap-2 scale-75">
          <Button
            label="View"
            icon={ViewIcon}
            variant="success"
            onClick={() =>
              router.push(`/performance/evaluation/view/${row._id}`)
            }
          />
          <Button
            label="Edit"
            icon={EditIcon}
            variant="info"
            onClick={() =>
              router.push(`/performance/evaluation/edit/${row._id}`)
            }
          />
        </div>
      ),
    },
  ];

  // --- Fetch ---
  const fetchAll = async () => {
    setEvalPending(true);
    try {
      const [evalRes] = await Promise.all([
        fetch("/api/performance/evaluation"),
      ]);
      const evalJson = await evalRes.json();

      setEvalData(evalJson.data ?? []);
    } catch (err) {
      toast.error("Error fetching dashboard data");
    } finally {
      setEvalPending(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // --- Delete ---
  const handleDeleteEval = async (id: string) => {
    if (!confirm("Delete evaluation?")) return;
    const res = await fetch(`/api/performance/evaluation/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Evaluation deleted");
      fetchAll();
    } else {
      toast.error("Failed to delete evaluation");
    }
  };

  // --- Filter ---
  const filteredEval = useMemo(() => {
    return evalData.filter((i) => {
      const fullName =
        i.userId?.name.toLowerCase() ||
        i.userId?.departmentId.name.toLowerCase() ||
        i.userId?.designationId.name.toLowerCase();
      return fullName?.includes(evalFilter.toLowerCase());
    });
  }, [evalData, evalFilter]);

  return (
    <div className="space-y-12">
      <section>
        <div className="flex justify-between items-center mb-4">
          <Button
            label="New Evaluation"
            icon={PlusCircleIcon}
            variant="success"
            onClick={() => router.push("/performance/evaluation/create")}
          />
        </div>
        <div className="rounded-xl shadow-lg border overflow-hidden">
          <DataTable
            columns={evalColumns}
            data={filteredEval}
            pagination
            progressPending={evalPending}
            progressComponent={<Loading />}
            subHeader
            subHeaderComponent={
              <div className="flex items-center justify-between w-full py-2">
                <h1 className="text-md md:text-2xl font-sans font-bold">
                  Performance Evaluation
                </h1>
                <FilterTable
                  onFilter={(e) => setEvalFilter(e.target.value)}
                  onClear={() => setEvalFilter("")}
                  filterText={evalFilter}
                  placeholder="Search names..."
                />
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
}
