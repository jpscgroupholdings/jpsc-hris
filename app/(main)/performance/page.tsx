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

export default function CombinedMonitoringPage() {
  const router = useRouter();

  const [accData, setAccData] = useState<any[]>([]);
  const [accPending, setAccPending] = useState(true);
  const [accFilter, setAccFilter] = useState("");

  const [evalData, setEvalData] = useState<any[]>([]);
  const [evalPending, setEvalPending] = useState(true);
  const [evalFilter, setEvalFilter] = useState("");

  // --- Helper ---
  const getFullName = (user: any) => {
    if (!user) return "N/A";
    return (
      user.name ||
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
      "N/A"
    );
  };

  const getScoreColor = (percent: number) => {
    if (percent <= 74) return "text-red-500";
    if (percent <= 84) return "text-yellow-500";
    return "text-green-500";
  };

  // --- Columns ---
  const accColumns = [
    {
      name: "Employee",
      selector: (row: any) => getFullName(row.userId),
      sortable: true,
    },
    {
      name: "Period Start",
      selector: (row: any) =>
        row.dateStart ? format(new Date(row.dateStart), "MMM dd, yyyy") : "N/A",
      sortable: true,
    },
    {
      name: "Period End",
      selector: (row: any) =>
        row.dateEnd ? format(new Date(row.dateEnd), "MMM dd, yyyy") : "N/A",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex gap-2 scale-75">
          <Button
            label="Edit"
            icon={EditIcon}
            variant="info"
            onClick={() =>
              router.push(`/performance/accomplishment/edit/${row._id}`)
            }
          />
          <Button
            label="Delete"
            icon={Trash2Icon}
            variant="danger"
            onClick={() => handleDeleteAcc(row._id)}
          />
        </div>
      ),
    },
  ];

  const evalColumns = [
    {
      name: "Employee",
      selector: (row: any) => getFullName(row.userId),
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: any) => row.userId?.departmentId?.name ?? "N/A",
      sortable: true,
    },
    {
      name: "Evaluated By",
      selector: (row: any) => getFullName(row.evaluatedBy),
      sortable: true,
    },
    {
      name: "Period",
      selector: (row: any) => {
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
      cell: (row: any) => (
        <span className={`font-semibold ${getScoreColor(row.finalPercent)}`}>
          {row.finalScore?.toFixed(2)} ({row.finalPercent}%)
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
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
    setAccPending(true);
    setEvalPending(true);
    try {
      const [accRes, evalRes] = await Promise.all([
        fetch("/api/performance/accomplishment"),
        fetch("/api/performance/evaluation"),
      ]);
      const accJson = await accRes.json();
      const evalJson = await evalRes.json();

      setAccData(accJson.data ?? []);
      setEvalData(evalJson.data ?? []);
    } catch (err) {
      toast.error("Error fetching dashboard data");
    } finally {
      setAccPending(false);
      setEvalPending(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // --- Delete ---
  const handleDeleteAcc = async (id: string) => {
    if (!confirm("Delete accomplishment?")) return;
    const res = await fetch(`/api/performance/accomplishment/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Accomplishment deleted");
      fetchAll();
    } else {
      toast.error("Failed to delete accomplishment");
    }
  };

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
  const filteredAcc = useMemo(() => {
    return accData.filter((i) => {
      const fullName = getFullName(i.userId).toLowerCase();
      return fullName.includes(accFilter.toLowerCase());
    });
  }, [accData, accFilter]);

  const filteredEval = useMemo(() => {
    return evalData.filter((i) => {
      const fullName = getFullName(i.userId).toLowerCase();
      return fullName.includes(evalFilter.toLowerCase());
    });
  }, [evalData, evalFilter]);

  return (
    <div className="space-y-12">
      {/* SECTION 1: ACCOMPLISHMENTS */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Target Accomplishments</h2>
          <Button
            label="New Accomplishment"
            icon={PlusCircleIcon}
            variant="success"
            onClick={() => router.push("/performance/accomplishment/create")}
          />
        </div>
        <div className="rounded-xl shadow-lg border overflow-hidden">
          <DataTable
            columns={accColumns}
            data={filteredAcc}
            pagination
            progressPending={accPending}
            progressComponent={<Loading />}
            subHeader
            subHeaderComponent={
              <div className="flex items-center justify-end w-full py-2">
                <FilterTable
                  onFilter={(e) => setAccFilter(e.target.value)}
                  onClear={() => setAccFilter("")}
                  filterText={accFilter}
                  placeholder="Search tasks..."
                />
              </div>
            }
          />
        </div>
      </section>

      {/* SECTION 2: EVALUATIONS */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Performance Evaluations</h2>
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
              <div className="flex items-center justify-end w-full py-2">
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
