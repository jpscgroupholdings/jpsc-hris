"use client";

import { Target, CheckCircle2, ChevronDown } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/performance/evaluation";

interface AccomplishmentsStepProps {
  form: Partial<Evaluation>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  s3Percent: string;
  loading: boolean;
  isEditMode: boolean;
}

export default function AccomplishmentsStep({
  form,
  handleChange,
  s3Percent,
  loading,
  isEditMode,
}: AccomplishmentsStepProps) {
  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-purple-800">
          <Target className="text-purple-500" /> III: Production Accomplishments
        </div>
      </div>

      {/* Directions */}
      <div>
        <p className="font-bold text-lg">Key Job Function Evaluation:</p>
        <p className="text-sm">
          Evaluate the following key job functions based on the employee's
          actual performance during the evaluation period. <br />
          <br />
          For each job function, assign an importance ranking (Critical = 3,
          Very Important = 2, Important = 1) and performance rating using the
          defined scale (ME=5, HC=4, PC=3, ND=2, U=1). <br />
          <br />
          Ratings must be based on actual output, quality, timeliness, and
          consistency of work. Provide brief comments or examples to support the
          rating given. <br />
          <br />
          The assigned ratings and importance rankings shall be used to compute
          the weighted Section III performance score.
        </p>
      </div>

      {/* Accomplishment rows */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <div className="flex-1">
              <InputField
                label={`Item ${i} Task Description`}
                type="text"
                name={`accomplishmentRemarks${i}`}
                value={(form as any)[`accomplishmentRemarks${i}`]}
                onChange={handleChange}
                placeholder="Describe the task or accomplishment..."
              />
            </div>
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
        ))}
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-4">
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
              {isEditMode ? "Update Evaluation" : "Submit Evaluation"}
            </>
          )}
        </button>
      </div>
    </section>
  );
}
