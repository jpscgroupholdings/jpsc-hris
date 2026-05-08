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

  // States for Accomplishments
  const [accData, setAccData] = useState<any[]>([]);
  const [accPending, setAccPending] = useState(true);
  const [accFilter, setAccFilter] = useState("");

  // States for Evaluations
  const [evalData, setEvalData] = useState<any[]>([]);
  const [evalPending, setEvalPending] = useState(true);
  const [evalFilter, setEvalFilter] = useState("");

  // --- Columns Definitions ---
  const accColumns = [
    {
      name: "Employee",
      selector: (row: any) =>
        row.userId?.name || `${row.userId?.firstName} ${row.userId?.lastName}`,
      sortable: true,
    },
    {
      name: "Period Start",
      selector: (row: any) =>
        row.dateStart ? format(new Date(row.dateStart), "MMM/dd/yyyy") : "N/A",
      sortable: true,
    },
    {
      name: "Period End",
      selector: (row: any) =>
        row.dateEnd ? format(new Date(row.dateEnd), "MMM/dd/yyyy") : "N/A",
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
              router.push(`/production/accomplishment/edit/${row._id}`)
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
      selector: (row: any) =>
        `${row.userId?.firstName} ${row.userId?.lastName}`,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row: any) => row.userId?.departmentId?.name || "N/A",
      sortable: true,
    },
    {
      name: "Evaluated By",
      selector: (row: any) =>
        `${row.evaluatedBy?.firstName} ${row.evaluatedBy?.lastName}`,
      sortable: true,
    },
    {
      name: "Score",
      cell: (row: any) => (
        <span className={`${row.finalPercent} <=74 `}>
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
              router.push(`/production/evaluation/view/${row._id}`)
            }
          />
          <Button
            label="Edit"
            icon={EditIcon}
            variant="info"
            onClick={() =>
              router.push(`/production/evaluation/edit/${row._id}`)
            }
          />
          {/* <Button
            label="Delete"
            icon={Trash2Icon}
            variant="danger"
            onClick={() => handleDeleteEval(row._id)}
          /> */}
        </div>
      ),
    },
  ];

  // --- Fetching Logic ---
  const fetchAll = async () => {
    try {
      const [accRes, evalRes] = await Promise.all([
        fetch("/api/production/accomplishment"),
        fetch("/api/production/evaluation"),
      ]);
      const accJson = await accRes.json();
      const evalJson = await evalRes.json();

      setAccData(accJson.data || []);
      setEvalData(evalJson.data || []);
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

  // --- Delete Handlers ---
  const handleDeleteAcc = async (id: string) => {
    if (!confirm("Delete accomplishment?")) return;
    const res = await fetch(`/api/production/accomplishment/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Accomplishment deleted");
      fetchAll();
    }
  };

  const handleDeleteEval = async (id: string) => {
    if (!confirm("Delete evaluation?")) return;
    const res = await fetch(`/api/production/evaluation/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Evaluation deleted");
      fetchAll();
    }
  };

  // --- Filtered Data ---
  const filteredAcc = useMemo(() => {
    return accData.filter((i) =>
      (i.userId?.firstName + i.userId?.lastName)
        .toLowerCase()
        .includes(accFilter.toLowerCase()),
    );
  }, [accData, accFilter]);

  const filteredEval = useMemo(() => {
    return evalData.filter((i) =>
      (i.userId?.firstName + i.userId?.lastName)
        .toLowerCase()
        .includes(evalFilter.toLowerCase()),
    );
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
            onClick={() => router.push("/production/accomplishment/create")}
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

      <hr className="border-gray-200" />

      {/* SECTION 2: EVALUATIONS */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Performance Evaluations</h2>
          <Button
            label="New Evaluation"
            icon={PlusCircleIcon}
            variant="success"
            onClick={() => router.push("/production/evaluation/create")}
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
