import { ClipboardCheck } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/production/evaluation";

interface CompetenciesStepProps {
  form: Partial<Evaluation>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  s2Percent: string;
}

const COMPETENCIES = [
  {
    id: "jobKnowledge",
    label: "Job Knowledge",
    description: [
      "Understands the duties and responsibilities of the job.",
      "Has Knowledge of subject area and related policies, procedures, and technical expertise.",
      "Uses information, materials, equipment, and techniques accurately and appropriately.",
      "Keeps up-to-date with new policies, procedures, techniques",
    ],
  },
  {
    id: "workQuality",
    label: "Work Quality",
    description: [
      "Shows attention to detail, accuracy, follow-through and thoroughness.",
      "Complies with work and health and safety rules and procedures",
      "Exercise good judgement and discretion in matters relative to sensitive or confidential issues.",
    ],
  },
  {
    id: "productivity",
    label: "Productivity",
    description: [
      "Consistently manages assigned workload.",
      "Establishes and manages priorities effectively.",
      "Uses time efficiently.",
      "Maintain an organized, functional workspace.",
    ],
  },
  {
    id: "versatility",
    label: "Adaptability and Flexibility",
    description: [
      "Adapts to changes in the work environment",
      "Performs well under pressure.",
      "Maintains an organized, functional workspace.",
    ],
  },
  {
    id: "initiative",
    label: "Initiative and Problem-Solving",
    description: [
      "Is a self-starter.",
      "Generates innovative ideas, approaches, and solutions",
      "Seeks new challenges, self-development, and learning opportunities",
      "Anticipates and recognizes potential problems.",
      "Generates alternative solutions when solving problems.",
    ],
  },
  {
    id: "cooperation",
    label: "Cooperation and Teamwork",
    description: [
      "Maintains effective working relationships.",
      "Works cooperatively in team situations.",
      "Offers assistance and support to others.",
      "Admits to and learns from own mistakes.",
      "Participates constructively in team efforts",
    ],
  },
  {
    id: "dependability",
    label: "Dependability",
    description: [
      "Is punctual and regularly in attendance.",
      "Follows instructions.",
      "Works independently.",
      "Completes assignments and meets commitments and deadlines.",
    ],
  },
  {
    id: "communication",
    label: "Communication",
    description: [
      "Communicates clearly and accurately both verbally and in writing.",
      "Keeps others informed.",
      "Interacts effectively with a wide diversity of individuals and work styles.",
      "Maintains a pleasant and professional demeanor in all interpersonal relationships.",
      "Capable of resolving conflicts.",
      "Receptive to feedback.",
    ],
  },
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
          <ClipboardCheck className="text-emerald-500" /> Section II:
          Performance Competency Evaluation
        </div>
      </div>

      {/* Directions */}
      <div>
        <p className="font-bold text-lg">Performance Competency Evaluation:</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Evaluate the following performance competencies based on the
          employee's actual performance during the evaluation period.
          <br />
          <br />
          For each competency, assign a performance rating using the defined
          scale (ME=5, HC=4, PC=3, ND=2, U=1). Ratings must be based on actual
          output, quality, timeliness, and consistency of work. Provide brief
          comments or examples to support the rating given.
        </p>
      </div>

      {/* Regular competencies */}
      <div className="grid grid-cols-1 gap-6">
        {COMPETENCIES.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 border rounded-2xl p-5"
          >
            {/* LEFT — label + bullets */}
            <div className="lg:col-span-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                {item.label}
              </h3>
              {item.description.length > 0 && (
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  {item.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* MIDDLE — remarks */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                Remarks
              </label>
              <textarea
                name={`${item.id}Remarks`}
                value={(form as any)[`${item.id}Remarks`] || ""}
                onChange={handleChange}
                placeholder={`Add notes for ${item.label.toLowerCase()}...`}
                rows={5}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none"
              />
            </div>

            {/* RIGHT — score */}
            <div className="lg:col-span-2">
              <InputField
                label="Score (0–5)"
                type="number"
                name={item.id}
                value={(form as any)[item.id]}
                onChange={handleChange}
                min={0}
                max={5}
              />
            </div>
          </div>
        ))}

        {/* ── Optional Competency — separate card with description textarea ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-2 border-dashed border-emerald-200 rounded-2xl p-5 bg-emerald-50/30">
          {/* LEFT — label + description textarea */}
          <div className="lg:col-span-6">
            <h3 className="font-bold text-lg text-gray-800 mb-1">
              Optional Competency
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Define a custom competency relevant to this employee's role.
            </p>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
              Competency Description
            </label>
            <textarea
              name="optionalCompetencyDescription"
              value={form.optionalCompetencyDescription || ""}
              onChange={handleChange}
              placeholder="Describe the competency being evaluated (e.g. Technical Writing, Client Relations)..."
              rows={5}
              className="w-full border border-emerald-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
            />
          </div>

          {/* MIDDLE — remarks */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
              Remarks
            </label>
            <textarea
              name="optionalCompetencyRemarks"
              value={form.optionalCompetencyRemarks || ""}
              onChange={handleChange}
              placeholder="Add notes for this optional competency..."
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none bg-white"
            />
          </div>

          {/* RIGHT — score */}
          <div className="lg:col-span-2">
            <InputField
              label="Score (0–5)"
              type="number"
              name="optionalCompetency"
              value={form.optionalCompetency as number}
              onChange={handleChange}
              min={0}
              max={5}
            />
          </div>
        </div>
      </div>

      {/* ── Managerial Factors ── */}
      <div className="mt-4 pt-8 border-t border-dashed">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
          Managerial Factors — Supervisors Only
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Leadership */}
          <div className="border rounded-2xl p-5 space-y-3">
            <p className="font-bold text-gray-700">Management / Leadership</p>
            <div className="flex gap-4 items-start">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Remarks
                </label>
                <textarea
                  name="leadershipRemarks"
                  value={form.leadershipRemarks || ""}
                  onChange={handleChange}
                  placeholder="Leadership remarks..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Subordinates Development */}
          <div className="border rounded-2xl p-5 space-y-3">
            <p className="font-bold text-gray-700">
              Development of Subordinates
            </p>
            <div className="flex gap-4 items-start">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                  Remarks
                </label>
                <textarea
                  name="subordinatesDevelopmentRemarks"
                  value={form.subordinatesDevelopmentRemarks || ""}
                  onChange={handleChange}
                  placeholder="Subordinates development remarks..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
