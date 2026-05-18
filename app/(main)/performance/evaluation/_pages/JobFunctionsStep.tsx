import { Briefcase, ChevronDown } from "lucide-react";
import { Evaluation } from "@/models/performance/evaluation";

interface JobFunctionsStepProps {
  form: Partial<Evaluation>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
  ) => void;
  s1Percent: string;
  jobFunctionsReadOnly?: boolean;
}

export default function JobFunctionsStep({
  form,
  handleChange,
  s1Percent,
  jobFunctionsReadOnly = false,
}: JobFunctionsStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <Briefcase className="text-orange-500" />
          I: Job Description & Responsibilities
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-400">SECTION SCORE</span>
          <p className="text-xl font-black text-orange-500">{s1Percent}%</p>
        </div>
      </div>

      {/* Directions */}
      <div>
        <p className="font-bold text-lg">Key Job Function Evaluation:</p>
        <p className="text-sm">
          Evaluate the following key job functions based on the employee's
          actual performance during the evaluation period.
          <br />
          <br />
          For each job function, assign an importance ranking{" "}
          <span className="font-extrabold">
            (Critical = 3, Very Important = 2, Important = 1)
          </span>{" "}
          and performance rating using the defined scale{" "}
          <span className="font-extrabold">(ME=5, HC=4, PC=3, ND=2, U=1)</span>.
          <br />
          <br />
          Ratings must be based on{" "}
          <span className="font-extrabold">
            actual output, quality, timeliness, and consistency of work
          </span>
          . Provide brief comments or examples to support the rating given.
        </p>
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => {
          let priority = "";
          let priorityStyle = "";

          if (i <= 2) {
            priority = "Critical";
            priorityStyle = "text-red-500";
          } else if (i <= 4) {
            priority = "Very Important";
            priorityStyle = "text-orange-500";
          } else {
            priority = "Important";
            priorityStyle = "text-green-500";
          }

          const scoreName = `jobFunctionScore${i}`;
          const currentScore = (form as any)[scoreName] ?? "";

          return (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start bg-gray-50/50 p-4 rounded-2xl border"
            >
              {/* Priority Label */}
              <div className="lg:col-span-12">
                <span className={`text-xs font-semibold ${priorityStyle}`}>
                  {priority}
                </span>
              </div>

              {/* Responsibility 1 */}
              <div className="lg:col-span-5 flex flex-col">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility {i * 2 - 1}
                </label>
                <textarea
                  name={`jobFunction${i * 2 - 1}`}
                  value={(form as any)[`jobFunction${i * 2 - 1}`] ?? ""}
                  onChange={handleChange}
                  readOnly={jobFunctionsReadOnly}
                  rows={3}
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 resize-none ${
                    jobFunctionsReadOnly
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-white"
                  }`}
                />
              </div>

              {/* Responsibility 2 */}
              <div className="lg:col-span-5 flex flex-col">
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Responsibility {i * 2}
                </label>
                <textarea
                  name={`jobFunction${i * 2}`}
                  value={(form as any)[`jobFunction${i * 2}`] ?? ""}
                  onChange={handleChange}
                  readOnly={jobFunctionsReadOnly}
                  rows={3}
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 resize-none ${
                    jobFunctionsReadOnly
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-white"
                  }`}
                />
              </div>

              {/* Score select — properly wired to form state */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-500">
                  Score (1–5)
                </label>
                <div className="relative group">
                  <select
                    name={scoreName}
                    value={currentScore}
                    onChange={(e) => {
                      // Cast to number so calculations work correctly
                      handleChange({
                        ...e,
                        target: {
                          ...e.target,
                          name: scoreName,
                          value: e.target.value,
                          type: "number",
                        },
                      } as any);
                    }}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-sm
                      text-gray-700 cursor-pointer transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400
                      hover:border-gray-400"
                  >
                    <option value="">Select Score</option>
                    {[
                      { value: 1, label: "1 — Unsatisfactory" },
                      { value: 2, label: "2 — Needs Development" },
                      { value: 3, label: "3 — Proficient & Competent" },
                      { value: 4, label: "4 — Highly Commendable" },
                      { value: 5, label: "5 — Mastery & Excellence" },
                    ].map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 group-focus-within:text-orange-500">
                    <ChevronDown size={16} />
                  </div>
                </div>

                {/* Visual score badge */}
                {currentScore ? (
                  <div
                    className={`mt-2 text-center text-xs font-bold rounded-lg py-1 ${
                      Number(currentScore) === 5
                        ? "bg-green-100 text-green-700"
                        : Number(currentScore) === 4
                          ? "bg-lime-100 text-lime-700"
                          : Number(currentScore) === 3
                            ? "bg-yellow-100 text-yellow-700"
                            : Number(currentScore) === 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                    }`}
                  >
                    {Number(currentScore) === 5
                      ? "Mastery & Excellence"
                      : Number(currentScore) === 4
                        ? "Highly Commendable"
                        : Number(currentScore) === 3
                          ? "Proficient & Competent"
                          : Number(currentScore) === 2
                            ? "Needs Development"
                            : "Unsatisfactory"}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
