"use client";

import { Target, CheckCircle2, ChevronDown } from "lucide-react";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";
import { Evaluation } from "@/models/performance/evaluation";

interface AccomplishmentsStepProps {
  form: Partial<Evaluation>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  accomplishmentOptions: SearchSelectOption[];
  handleAccomplishmentChange: (id: string | null) => void;
  s3Percent: string;
  loading: boolean;
  isEditMode: boolean;
}

const SCORE_BADGE: Record<number, string> = {
  5: "bg-green-100 text-green-700",
  4: "bg-lime-100 text-lime-700",
  3: "bg-yellow-100 text-yellow-700",
  2: "bg-orange-100 text-orange-700",
  1: "bg-red-100 text-red-700",
};

const SCORE_LABEL: Record<number, string> = {
  5: "Mastery & Excellence",
  4: "Highly Commendable",
  3: "Proficient & Competent",
  2: "Needs Development",
  1: "Unsatisfactory",
};

const IMPORTANCE = [
  "Critical",
  "Critical",
  "Very Important",
  "Very Important",
  "Important",
];
const IMPORTANCE_STYLE = [
  "text-red-500",
  "text-red-500",
  "text-orange-500",
  "text-orange-500",
  "text-green-500",
];

export default function AccomplishmentsStep({
  form,
  handleChange,
  accomplishmentOptions,
  handleAccomplishmentChange,
  s3Percent,
  loading,
  isEditMode,
}: AccomplishmentsStepProps) {
  const handleSelectChange =
    (scoreName: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange({
        ...e,
        target: {
          ...e.target,
          name: scoreName,
          value: e.target.value,
          type: "number",
        },
      } as any);
    };

  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-purple-800">
          <Target className="text-purple-500" /> III: Production Accomplishments
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-400">SECTION SCORE</span>
          <p className="text-xl font-black text-purple-600">{s3Percent}%</p>
        </div>
      </div>

      <div>
        <p className="font-bold text-lg">
          Production Accomplishment Evaluation:
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Select the employee's production report to auto-load their
          accomplishments. Rate each accomplishment using the defined scale
          (ME=5, HC=4, PC=3, ND=2, U=1). Ratings must reflect actual output,
          quality, and timeliness.
        </p>
      </div>

      {/* Import report */}
      <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
        {accomplishmentOptions.length === 0 && (
          <p className="text-xs text-gray-400 mt-2 italic">
            No reports found for this employee's designation. Select an employee
            first.
          </p>
        )}
      </div>

      {/* Accomplishment rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => {
          const scoreName = `accomplishmentScore${i}`;
          const currentScore = Number((form as any)[scoreName] ?? 0);

          return (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200"
            >
              {/* Importance tag */}
              <div className="lg:col-span-12 flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400">
                  Item {i}
                </span>
                <span
                  className={`text-xs font-semibold ${IMPORTANCE_STYLE[i - 1]}`}
                >
                  — {IMPORTANCE[i - 1]}
                </span>
              </div>

              {/* Task description — read-only, filled from accomplishment report */}
              <div className="lg:col-span-9">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Task / Accomplishment Description
                </label>
                <div className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 min-h-13">
                  {(form as any)[`accomplishmentRemarks${i}`] || (
                    <span className="text-gray-300 italic">
                      No report loaded — select a report above
                    </span>
                  )}
                </div>
              </div>

              {/* Score select */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-500">
                  Score (1–5)
                </label>
                <div className="relative group">
                  <select
                    name={scoreName}
                    value={currentScore || ""}
                    onChange={handleSelectChange(scoreName)}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-sm
                      text-gray-700 cursor-pointer transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400
                      hover:border-gray-400"
                  >
                    <option value="" disabled>
                      Select Score
                    </option>
                    <option value="1">1 — Unsatisfactory</option>
                    <option value="2">2 — Needs Development</option>
                    <option value="3">3 — Proficient & Competent</option>
                    <option value="4">4 — Highly Commendable</option>
                    <option value="5">5 — Mastery & Excellence</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 group-focus-within:text-purple-500">
                    <ChevronDown size={16} />
                  </div>
                </div>
                {currentScore > 0 && (
                  <div
                    className={`mt-2 text-center text-xs font-bold rounded-lg py-1 ${SCORE_BADGE[currentScore] ?? ""}`}
                  >
                    {SCORE_LABEL[currentScore]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className={`
            flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-base
            shadow-lg transition-all duration-200
            ${
              loading
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-indigo-200"
            }
          `}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              {isEditMode ? "Update & View Summary" : "Submit & View Summary"}
            </>
          )}
        </button>
      </div>
    </section>
  );
}
