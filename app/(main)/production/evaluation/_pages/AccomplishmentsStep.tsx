"use client";

import { Target, CheckCircle2 } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { SearchSelect, SearchSelectOption } from "@/components/UI/SelectField";
import { Evaluation } from "@/models/production/evaluation";

interface AccomplishmentsStepProps {
  form: Partial<Evaluation>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accomplishmentOptions: SearchSelectOption[];
  handleAccomplishmentChange: (id: string | null) => void;
  s3Percent: string;
  loading: boolean;
  isEditMode: boolean;
}

export default function AccomplishmentsStep({
  form,
  handleChange,
  accomplishmentOptions,
  handleAccomplishmentChange,
  s3Percent,
  loading,
  isEditMode,
}: AccomplishmentsStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-purple-800">
          <Target className="text-purple-500" /> Section 3: Production
          Accomplishments
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

      {/* Import report */}
      <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
        <SearchSelect
          label="Import Production Report"
          placeholder="Search report to load tasks..."
          options={accomplishmentOptions}
          value={form.accomplishmentId as any}
          onChange={handleAccomplishmentChange}
        />
      </div>

      {/* Accomplishment rows */}
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
              <div className="text-gray-800 text-sm font-medium bg-white p-3 rounded-lg border border-gray-100 min-h-11">
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

      {/* Submit — saves to DB, parent advances to Summary step */}
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
