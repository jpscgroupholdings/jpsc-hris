import { Calculator } from "lucide-react";
import { Evaluation } from "@/models/performance/evaluation";
import { SearchSelectOption } from "@/components/UI/SelectField";

interface SummaryStepProps {
  form: Partial<Evaluation>;
  calculations: {
    s1Score: string;
    s1Percent: string;
    s2Score: string;
    s2Percent: string;
    s3Score: string;
    s3Percent: string;
    finalScore: string;
    finalPercent: string;
  };
  userOptions: SearchSelectOption[];
}

const SECTION_CARDS = [
  {
    label: "Section 1: Job Functions",
    scoreKey: "s1Score",
    percentKey: "s1Percent",
    color: "orange",
  },
  {
    label: "Section 2: Competencies",
    scoreKey: "s2Score",
    percentKey: "s2Percent",
    color: "emerald",
  },
  {
    label: "Section 3: Accomplishments",
    scoreKey: "s3Score",
    percentKey: "s3Percent",
    color: "purple",
  },
] as const;

const BG_MAP: Record<string, string> = {
  orange: "bg-orange-50 border-orange-100",
  emerald: "bg-emerald-50 border-emerald-100",
  purple: "bg-purple-50 border-purple-100",
};
const TEXT_MAP: Record<string, string> = {
  orange: "text-orange-600",
  emerald: "text-emerald-600",
  purple: "text-purple-600",
};

export default function SummaryStep({
  form,
  calculations,
  userOptions,
}: SummaryStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex items-center gap-3 text-xl font-bold text-gray-800 border-b pb-4">
        <Calculator className="text-indigo-500" /> Evaluation Summary
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SECTION_CARDS.map((s) => (
          <div
            key={s.label}
            className={`p-6 rounded-2xl border ${BG_MAP[s.color]} text-center`}
          >
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              {s.label}
            </p>
            <p className={`text-4xl font-black ${TEXT_MAP[s.color]}`}>
              {calculations[s.scoreKey]}
            </p>
            <p className="text-sm font-semibold text-gray-400 mt-1">
              {calculations[s.percentKey]}%
            </p>
          </div>
        ))}
      </div>

      <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
          Final Evaluation Score
        </p>
        <p className="text-7xl font-black text-blue-700">
          {calculations.finalScore}
        </p>
        <p className="text-2xl font-bold text-blue-400 mt-2">
          {calculations.finalPercent}%
        </p>
      </div>

      <div className="bg-gray-50 rounded-2xl border p-6 text-sm text-gray-600">
        <p className="font-bold text-gray-800 text-xs uppercase tracking-widest mb-4">
          Review Submission Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400">Employee: </span>
            <span className="font-semibold">
              {userOptions.find((u) => u.value === (form.userId as any))
                ?.label || "—"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Evaluated By: </span>
            <span className="font-semibold">
              {userOptions.find((u) => u.value === (form.evaluatedBy as any))
                ?.label || "—"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Period Start: </span>
            <span className="font-semibold">
              {form.evaluationDateStart
                ? new Date(form.evaluationDateStart).toLocaleDateString()
                : "—"}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Period End: </span>
            <span className="font-semibold">
              {form.evaluationDateEnd
                ? new Date(form.evaluationDateEnd).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
