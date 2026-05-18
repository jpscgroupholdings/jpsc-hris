import { ChevronDown, ClipboardCheck } from "lucide-react";
import InputField from "@/components/UI/InputField";
import { Evaluation } from "@/models/performance/evaluation";

interface CompetenciesStepProps {
  form: Partial<Evaluation>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  s2Percent: string;
}

const SCORE_OPTIONS = [
  { value: 1, label: "1 — Unsatisfactory" },
  { value: 2, label: "2 — Needs Development" },
  { value: 3, label: "3 — Proficient & Competent" },
  { value: 4, label: "4 — Highly Commendable" },
  { value: 5, label: "5 — Mastery & Excellence" },
];

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

function ScoreSelect({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const num = Number(value);
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-500">
        Score (1–5)
      </label>
      <div className="relative group">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-4 pr-10 py-3 text-sm
            text-gray-700 cursor-pointer transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400
            hover:border-gray-400"
        >
          <option value="" disabled>
            Select Score
          </option>
          {SCORE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-500">
          <ChevronDown size={16} />
        </div>
      </div>
      {num > 0 && (
        <div
          className={`mt-2 text-center text-xs font-bold rounded-lg py-1 ${SCORE_BADGE[num] ?? ""}`}
        >
          {SCORE_LABEL[num]}
        </div>
      )}
    </div>
  );
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
  // Adapter: wraps select onChange to cast value as number (matches handleChange expectations)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: e.target.value,
        type: "number",
      },
    } as any);
  };

  return (
    <section className="bg-white p-8 rounded-3xl border shadow-sm space-y-8">
      <div className="flex justify-between items-end border-b pb-4">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <ClipboardCheck className="text-emerald-500" />
          II: Performance Competency Evaluation
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-gray-400">SECTION SCORE</span>
          <p className="text-xl font-black text-emerald-600">{s2Percent}%</p>
        </div>
      </div>

      <div>
        <p className="font-bold text-lg">Performance Competency Evaluation:</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Evaluate the following performance competencies based on the
          employee's actual performance during the evaluation period. Select the
          appropriate rating (ME=5, HC=4, PC=3, ND=2, U=1) and provide comments
          with specific examples.
        </p>
      </div>

      {/* Regular competencies */}
      <div className="grid grid-cols-1 gap-6">
        {COMPETENCIES.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 border rounded-2xl p-5"
          >
            {/* LEFT */}
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
              <ScoreSelect
                name={item.id}
                value={(form as any)[item.id] ?? ""}
                onChange={handleSelectChange}
              />
            </div>
          </div>
        ))}

        {/* Optional Competency */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 border-2 border-dashed border-emerald-200 rounded-2xl p-5 bg-emerald-50/30">
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
          <div className="lg:col-span-2">
            <ScoreSelect
              name="optionalCompetency"
              value={form.optionalCompetency ?? ""}
              onChange={handleSelectChange}
            />
          </div>
        </div>
      </div>

      {/* Managerial Factors */}
      <div className="mt-4 pt-8 border-t border-dashed">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
          Managerial Factors — Supervisors Only
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-2xl p-5 space-y-3">
            <p className="font-bold text-gray-700">Management / Leadership</p>
            <div className="flex gap-4 items-start">
              <div className="w-32 shrink-0">
                <ScoreSelect
                  name="leadership"
                  value={form.leadership ?? ""}
                  onChange={handleSelectChange}
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
          <div className="border rounded-2xl p-5 space-y-3">
            <p className="font-bold text-gray-700">
              Development of Subordinates
            </p>
            <div className="flex gap-4 items-start">
              <div className="w-32 shrink-0">
                <ScoreSelect
                  name="subordinatesDevelopment"
                  value={form.subordinatesDevelopment ?? ""}
                  onChange={handleSelectChange}
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
