import { Briefcase } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/production/evaluation";

interface JobFunctionsStepProps {
  form: Partial<Evaluation>;
  handleChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  s1Percent: string;
}

export default function JobFunctionsStep({
  form,
  handleChange,
  s1Percent,
}: JobFunctionsStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <Briefcase className="text-orange-500" />
          Section 1: Job Description & Responsibilities
        </div>
      </div>
      {/* Directions */}
      <div>
        <p className="font-bold text-lg">Key Job Function Evaluation:</p>
        <p className="text-sm">
          Evaluate the Following key job functions based on the employee's
          actual performance during the evaluation period. <br />
          <br />
          For each job function, assign an importance ranking (Critical = 3,
          Very Important = 2, Important = 1) and perforamce rating using the
          defined scale (ME=5, HC=4, PC=3, ND=2, U=1). <br />
          <br />
          Ratings must be based on actual output, quality, timeliness, and
          consistency of work. PRovide brief comments or examples to support the
          rating given. <br />
          <br />
          The assigned ratings and importance rankings shall be used to compute
          the weighted Section I performance score.
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-jpsc-950"
            >
              {/* Priority Label */}
              <div className="lg:col-span-12">
                <span className={`text-xs font-semibold ${priorityStyle}`}>
                  {priority}
                </span>
              </div>

              {/* Responsibility 1 */}
              <div className="lg:col-span-5 flex flex-col">
                <InputField
                  type="text"
                  label={`Responsibility ${i * 2 - 1}`}
                  name={`jobFunction${i * 2 - 1}`}
                  value={(form as any)[`jobFunction${i * 2 - 1}`]}
                  onChange={handleChange}
                />
              </div>

              {/* Responsibility 2 */}
              <div className="lg:col-span-5">
                <InputField
                  type="text"
                  label={`Responsibility ${i * 2}`}
                  name={`jobFunction${i * 2}`}
                  value={(form as any)[`jobFunction${i * 2}`]}
                  onChange={handleChange}
                />
              </div>

              {/* Score */}
              <div className="lg:col-span-2">
                <InputField
                  label="Score (0-5)"
                  type="number"
                  name={`jobFunctionScore${i}`}
                  value={(form as any)[`jobFunctionScore${i}`]}
                  onChange={handleChange}
                  min={0}
                  max={5}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
