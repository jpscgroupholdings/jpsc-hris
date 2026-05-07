import { Briefcase } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/production/evaluation";

interface JobFunctionsStepProps {
  form: Partial<Evaluation>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
          <Briefcase className="text-orange-500" /> Section 1: Job Functions &
          Responsibilities
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-400">SECTION SCORE</span>
          <p className="text-xl font-black text-orange-600">{s1Percent}%</p>
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100"
          >
            <div className="lg:col-span-5">
              <InputField
                type="text"
                label={`Responsibility ${i * 2 - 1}`}
                name={`jobFunction${i * 2 - 1}`}
                value={(form as any)[`jobFunction${i * 2 - 1}`]}
                onChange={handleChange}
              />
            </div>
            <div className="lg:col-span-5">
              <InputField
                type="text"
                label={`Responsibility ${i * 2}`}
                name={`jobFunction${i * 2}`}
                value={(form as any)[`jobFunction${i * 2}`]}
                onChange={handleChange}
              />
            </div>
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
        ))}
      </div>
    </section>
  );
}
