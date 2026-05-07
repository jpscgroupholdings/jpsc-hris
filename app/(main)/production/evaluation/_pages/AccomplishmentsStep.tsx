import { Target } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";
import { Evaluation } from "@/models/production/evaluation";

interface AccomplishmentsStepProps {
  form: Partial<Evaluation>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accomplishmentOptions: SearchSelectOption[];
  handleAccomplishmentChange: (id: string | null) => void;
  s3Percent: string;
}

export default function AccomplishmentsStep({
  form,
  handleChange,
  accomplishmentOptions,
  handleAccomplishmentChange,
  s3Percent,
}: AccomplishmentsStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-purple-800">
          <Target className="text-purple-500" /> Section 3: Production
          Accomplishments
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-400">SECTION SCORE</span>
          <p className="text-xl font-black text-purple-600">{s3Percent}%</p>
        </div>
      </div>

      <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
        <SearchSelect
          label="Import Production Report"
          placeholder="Search report to load tasks..."
          options={accomplishmentOptions}
          value={form.accomplishmentId as any}
          onChange={handleAccomplishmentChange}
        />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <div className="flex-1">
              <div className="text-[10px] font-black text-purple-400 uppercase mb-2">
                Item {i} Task Description
              </div>
              <div className="text-gray-800 text-sm font-medium bg-white p-3 rounded-lg border border-gray-100 min-h-[44px]">
                {(form as any)[`accomplishmentRemarks${i}`] || (
                  <span className="text-gray-300 italic">No report loaded</span>
                )}
              </div>
            </div>
            <div className="w-full md:w-32">
              <InputField
                label="Score (0-5)"
                type="number"
                name={`accomplishmentScore${i}`}
                value={(form as any)[`accomplishmentScore${i}`]}
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
