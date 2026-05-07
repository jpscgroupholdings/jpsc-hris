import { ClipboardCheck } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/production/evaluation";

interface CompetenciesStepProps {
  form: Partial<Evaluation>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  s2Percent: string;
}

const COMPETENCIES = [
  { id: "jobKnowledge", label: "Job Knowledge" },
  { id: "workQuality", label: "Work Quality" },
  { id: "productivity", label: "Productivity" },
  { id: "versatility", label: "Versatility" },
  { id: "initiative", label: "Initiative" },
  { id: "cooperation", label: "Cooperation" },
  { id: "dependability", label: "Dependability" },
  { id: "communication", label: "Communication" },
  { id: "optionalCompetency", label: "Optional Competency" },
];

export default function CompetenciesStep({
  form,
  handleChange,
  s2Percent,
}: CompetenciesStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <ClipboardCheck className="text-emerald-500" /> Section 2: Core
          Competencies
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-400">SECTION SCORE</span>
          <p className="text-xl font-black text-emerald-600">{s2Percent}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-8">
        {COMPETENCIES.map((item) => (
          <div key={item.id} className="space-y-3">
            <div className="flex gap-4 items-start">
              <div className="w-24 shrink-0">
                <InputField
                  label="Score"
                  type="number"
                  name={item.id}
                  value={(form as any)[item.id]}
                  onChange={handleChange}
                  min={0}
                  max={5}
                />
              </div>
              <div className="flex-1">
                <InputField
                  type="text"
                  label={`${item.label} Remarks`}
                  name={`${item.id}Remarks`}
                  value={(form as any)[`${item.id}Remarks`]}
                  onChange={handleChange}
                  placeholder={`Add notes for ${item.label.toLowerCase()}...`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Managerial Factors (Section 2.5) */}
      <div className="mt-12 pt-8 border-t border-dashed">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
          Managerial Factors (Only for Supervisors)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-24 shrink-0">
              <InputField
                label="Score"
                type="number"
                name="leadership"
                value={form.leadership as number}
                onChange={handleChange}
                min={0}
                max={5}
              />
            </div>
            <div className="flex-1">
              <InputField
                type="text"
                label="Leadership Remarks"
                name="leadershipRemarks"
                value={form.leadershipRemarks}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-24 shrink-0">
              <InputField
                label="Score"
                type="number"
                name="subordinatesDevelopment"
                value={form.subordinatesDevelopment as number}
                onChange={handleChange}
                min={0}
                max={5}
              />
            </div>
            <div className="flex-1">
              <InputField
                type="text"
                label="Subordinates Dev Remarks"
                name="subordinatesDevelopmentRemarks"
                value={form.subordinatesDevelopmentRemarks}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
