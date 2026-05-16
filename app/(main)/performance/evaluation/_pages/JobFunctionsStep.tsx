import { Briefcase, ChevronDown } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/performance/evaluation";

interface JobFunctionsStepProps {
  form: Partial<Evaluation>;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
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
      </div>
      {/* Directions */}
      <div>
        <p className="font-bold text-lg">Key Job Function Evaluation:</p>
        <p className="text-sm">
          Evaluate the Following key job functions based on the employee's
          actual performance during the evaluation period. <br />
          <br />
          For each job function, assign an importance ranking{" "}
          <span className="font-extrabold text-gold-950">
            (Critical = 3, Very Important = 2, Important = 1)
          </span>
          and performance rating using the defined scale{" "}
          <span className="font-extrabold text-gold-950">
            (ME=5, HC=4, PC=3, ND=2, U=1)
          </span>
          . <br />
          <br />
          Ratings must be based on{" "}
          <span className="font-extrabold text-gold-950">
            actual output, quality, timeliness, and consistency of work
          </span>
          . Provide brief comments or examples to support the rating given.{" "}
          <br />
          <br />
          The assigned ratings and importance rankings shall be used to compute
          the weighted Section III performance score.
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

          return (
            <div
              key={i}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-azure-950"
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
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring focus:ring-gold-500 focus:border-gold-500 resize-none ${
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
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring focus:ring-gold-500 focus:border-gold-500 resize-none ${
                    jobFunctionsReadOnly
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-white"
                  }`}
                />
              </div>

              {/* Score */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold font-sans text-azure-950 uppercase tracking-widest mb-2 ml-1">
                  Score (1-5)
                </label>
                <div className="relative group">
                  <select
                    className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-sm 
                 text-gray-700 cursor-pointer transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 
                 hover:border-gray-400"
                  >
                    <option value="" disabled hidden>
                      Select Score
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  {/* Custom Chevron Arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 group-focus-within:text-gold-500">
                    <ChevronDown />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
