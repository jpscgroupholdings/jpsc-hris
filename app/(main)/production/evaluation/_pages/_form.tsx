"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Save,
  ArrowLeft,
  Target,
  User as UserIcon,
  ClipboardCheck,
  Calculator,
  Briefcase,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Button from "@/components/UI/Button";
import { SearchSelectOption } from "@/components/UI/SelectField";
import { Evaluation } from "@/models/production/evaluation";

import StepProgressBar from "./StepProgressBar";
import PersonnelStep from "./PersonnelStep";
import JobFunctionsStep from "./JobFunctionsStep";
import CompetenciesStep from "./CompetenciesStep";
import AccomplishmentsStep from "./AccomplishmentsStep";
import SummaryStep from "./SummaryStep";

const STEPS = [
  { id: 0, label: "Personnel", icon: UserIcon, color: "blue" },
  { id: 1, label: "Job Functions", icon: Briefcase, color: "orange" },
  { id: 2, label: "Competencies", icon: ClipboardCheck, color: "emerald" },
  { id: 3, label: "Accomplishments", icon: Target, color: "purple" },
  { id: 4, label: "Summary", icon: Calculator, color: "indigo" },
];

export default function EvaluationForm({ initialData }: { initialData?: any }) {
  console.log("initialdata", initialData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [userOptions, setUserOptions] = useState<SearchSelectOption[]>([]);
  const [accomplishmentOptions, setAccomplishmentOptions] = useState<
    SearchSelectOption[]
  >([]);
  const [rawAccomplishments, setRawAccomplishments] = useState<any[]>([]);

  const isEditMode = !!initialData?._id;

  const [form, setForm] = useState<Partial<Evaluation>>({
    userId: initialData?.userId || "",
    evaluatedBy: initialData?.evaluatedBy || "",
    evaluationDateStart: initialData?.evaluationDateStart || "",
    evaluationDateEnd: initialData?.evaluationDateEnd || "",
    jobFunction1: initialData?.jobFunction1 || "",
    jobFunction2: initialData?.jobFunction2 || "",
    jobFunctionScore1: initialData?.jobFunctionScore1 || 0,
    jobFunction3: initialData?.jobFunction3 || "",
    jobFunction4: initialData?.jobFunction4 || "",
    jobFunctionScore2: initialData?.jobFunctionScore2 || 0,
    jobFunction5: initialData?.jobFunction5 || "",
    jobFunction6: initialData?.jobFunction6 || "",
    jobFunctionScore3: initialData?.jobFunctionScore3 || 0,
    jobFunction7: initialData?.jobFunction7 || "",
    jobFunction8: initialData?.jobFunction8 || "",
    jobFunctionScore4: initialData?.jobFunctionScore4 || 0,
    jobFunction9: initialData?.jobFunction9 || "",
    jobFunction10: initialData?.jobFunction10 || "",
    jobFunctionScore5: initialData?.jobFunctionScore5 || 0,
    jobFunction11: initialData?.jobFunction11 || "",
    jobFunction12: initialData?.jobFunction12 || "",
    jobFunctionScore6: initialData?.jobFunctionScore6 || 0,
    jobKnowledge: initialData?.jobKnowledge || 0,
    jobKnowledgeRemarks: initialData?.jobKnowledgeRemarks || "",
    workQuality: initialData?.workQuality || 0,
    workQualityRemarks: initialData?.workQualityRemarks || "",
    productivity: initialData?.productivity || 0,
    productivityRemarks: initialData?.productivityRemarks || "",
    versatility: initialData?.versatility || 0,
    versatilityRemarks: initialData?.versatilityRemarks || "",
    initiative: initialData?.initiative || 0,
    initiativeRemarks: initialData?.initiativeRemarks || "",
    cooperation: initialData?.cooperation || 0,
    cooperationRemarks: initialData?.cooperationRemarks || "",
    dependability: initialData?.dependability || 0,
    dependabilityRemarks: initialData?.dependabilityRemarks || "",
    communication: initialData?.communication || 0,
    communicationRemarks: initialData?.communicationRemarks || "",
    optionalCompetency: initialData?.optionalCompetency || 0,
    optionalCompetencyRemarks: initialData?.optionalCompetencyRemarks || "",
    leadership: initialData?.leadership || 0,
    leadershipRemarks: initialData?.leadershipRemarks || "",
    subordinatesDevelopment: initialData?.subordinatesDevelopment || 0,
    subordinatesDevelopmentRemarks:
      initialData?.subordinatesDevelopmentRemarks || "",
    accomplishmentId: initialData?.accomplishmentId || "",
    accomplishmentScore1: initialData?.accomplishmentScore1 || 0,
    accomplishmentRemarks1: initialData?.accomplishmentRemarks1 || "",
    accomplishmentScore2: initialData?.accomplishmentScore2 || 0,
    accomplishmentRemarks2: initialData?.accomplishmentRemarks2 || "",
    accomplishmentScore3: initialData?.accomplishmentScore3 || 0,
    accomplishmentRemarks3: initialData?.accomplishmentRemarks3 || "",
    accomplishmentScore4: initialData?.accomplishmentScore4 || 0,
    accomplishmentRemarks4: initialData?.accomplishmentRemarks4 || "",
    accomplishmentScore5: initialData?.accomplishmentScore5 || 0,
    accomplishmentRemarks5: initialData?.accomplishmentRemarks5 || "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        // Extracting IDs from objects for the dropdowns
        userId: initialData.userId?._id || initialData.userId || "",
        evaluatedBy:
          initialData.evaluatedBy?._id || initialData.evaluatedBy || "",

        // Formatting dates to YYYY-MM-DD for HTML date inputs
        evaluationDateStart: initialData.evaluationDateStart
          ? initialData.evaluationDateStart.split("T")[0]
          : "",
        evaluationDateEnd: initialData.evaluationDateEnd
          ? initialData.evaluationDateEnd.split("T")[0]
          : "",

        // Section 1
        jobFunction1: initialData.jobFunction1 || "",
        jobFunction2: initialData.jobFunction2 || "",
        jobFunctionScore1: initialData.jobFunctionScore1 || 0,
        jobFunction3: initialData.jobFunction3 || "",
        jobFunction4: initialData.jobFunction4 || "",
        jobFunctionScore2: initialData.jobFunctionScore2 || 0,
        jobFunction5: initialData.jobFunction5 || "",
        jobFunction6: initialData.jobFunction6 || "",
        jobFunctionScore3: initialData.jobFunctionScore3 || 0,
        jobFunction7: initialData.jobFunction7 || "",
        jobFunction8: initialData.jobFunction8 || "",
        jobFunctionScore4: initialData.jobFunctionScore4 || 0,
        jobFunction9: initialData.jobFunction9 || "",
        jobFunction10: initialData.jobFunction10 || "",
        jobFunctionScore5: initialData.jobFunctionScore5 || 0,
        jobFunction11: initialData.jobFunction11 || "",
        jobFunction12: initialData.jobFunction12 || "",
        jobFunctionScore6: initialData.jobFunctionScore6 || 0,

        // Section 2
        jobKnowledge: initialData.jobKnowledge || 0,
        jobKnowledgeRemarks: initialData.jobKnowledgeRemarks || "",
        workQuality: initialData.workQuality || 0,
        workQualityRemarks: initialData.workQualityRemarks || "",
        productivity: initialData.productivity || 0,
        productivityRemarks: initialData.productivityRemarks || "",
        versatility: initialData.versatility || 0,
        versatilityRemarks: initialData.versatilityRemarks || "",
        initiative: initialData.initiative || 0,
        initiativeRemarks: initialData.initiativeRemarks || "",
        cooperation: initialData.cooperation || 0,
        cooperationRemarks: initialData.cooperationRemarks || "",
        dependability: initialData.dependability || 0,
        dependabilityRemarks: initialData.dependabilityRemarks || "",
        communication: initialData.communication || 0,
        communicationRemarks: initialData.communicationRemarks || "",
        optionalCompetency: initialData.optionalCompetency || 0,
        optionalCompetencyRemarks: initialData.optionalCompetencyRemarks || "",

        // Managerial
        leadership: initialData.leadership || 0,
        leadershipRemarks: initialData.leadershipRemarks || "",
        subordinatesDevelopment: initialData.subordinatesDevelopment || 0,
        subordinatesDevelopmentRemarks:
          initialData.subordinatesDevelopmentRemarks || "",

        // Section 3
        accomplishmentId: initialData.accomplishmentId || "",
        accomplishmentScore1: initialData.accomplishmentScore1 || 0,
        accomplishmentRemarks1: initialData.accomplishmentRemarks1 || "",
        accomplishmentScore2: initialData.accomplishmentScore2 || 0,
        accomplishmentRemarks2: initialData.accomplishmentRemarks2 || "",
        accomplishmentScore3: initialData.accomplishmentScore3 || 0,
        accomplishmentRemarks3: initialData.accomplishmentRemarks3 || "",
        accomplishmentScore4: initialData.accomplishmentScore4 || 0,
        accomplishmentRemarks4: initialData.accomplishmentRemarks4 || "",
        accomplishmentScore5: initialData.accomplishmentScore5 || 0,
        accomplishmentRemarks5: initialData.accomplishmentRemarks5 || "",
      });
    }
  }, [initialData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, aRes] = await Promise.all([
          fetch("/api/employee/user/"),
          fetch("/api/production/accomplishment"),
        ]);
        const uJson = await uRes.json();
        const aJson = await aRes.json();
        const uData = Array.isArray(uJson) ? uJson : uJson.data || [];
        setUserOptions(
          uData.map((u: any) => ({
            value: u._id,
            label: `${u.firstName} ${u.lastName}`,
            description: u.designationId?.name || "Staff",
          })),
        );
        const aData = aJson.data || [];
        setRawAccomplishments(aData);
        setAccomplishmentOptions(
          aData.map((a: any) => ({
            value: a._id,
            label: `Report: ${new Date(a.dateStart).toLocaleDateString()}`,
            description: `By: ${a.userId?.firstName || "User"}`,
          })),
        );
      } catch {
        toast.error("Error loading data.");
      }
    };
    fetchData();
  }, []);

  const calculations = useMemo(() => {
    // Section 1: weighted scores — pairs (1&2)*3, (3&4)*2, (5&6)*1 → divide by 12
    const s1Weighted =
      form.jobFunctionScore1! * 3 +
      form.jobFunctionScore2! * 3 +
      form.jobFunctionScore3! * 2 +
      form.jobFunctionScore4! * 2 +
      form.jobFunctionScore5! * 1 +
      form.jobFunctionScore6! * 1;
    const s1Score = s1Weighted / 12;
    const s1Percent = (s1Score / 5) * 100;

    // Section 2: sum all 8 competency scores ÷ 8 ÷ 5
    // Note: leadership & subordinatesDevelopment are managerial extras, not in the /8 base
    const s2Sum =
      form.jobKnowledge! +
      form.workQuality! +
      form.productivity! +
      form.versatility! +
      form.initiative! +
      form.cooperation! +
      form.dependability! +
      form.communication!;
    const s2Score = s2Sum / 8 / 5;
    const s2Percent = (s2Score / 5) * 100;

    // Section 3: weighted scores — (1&2)*3, (3&4)*2, 5*1 → divide by 11
    const s3Weighted =
      form.accomplishmentScore1! * 3 +
      form.accomplishmentScore2! * 3 +
      form.accomplishmentScore3! * 2 +
      form.accomplishmentScore4! * 2 +
      form.accomplishmentScore5! * 1;
    const s3Score = s3Weighted / 11;
    const s3Percent = (s3Score / 5) * 100;

    // Overall: Section 1 = 30%, Section 2 = 35%, Section 3 = 35%
    const finalScore = s1Score * 0.3 + s2Score * 0.35 + s3Score * 0.35;
    const finalPercent = (finalScore / 5) * 100;

    return {
      s1Score: s1Score.toFixed(2),
      s1Percent: s1Percent.toFixed(2),
      s2Score: s2Score.toFixed(2),
      s2Percent: s2Percent.toFixed(2),
      s3Score: s3Score.toFixed(2),
      s3Percent: s3Percent.toFixed(2),
      finalScore: finalScore.toFixed(2),
      finalPercent: finalPercent.toFixed(2),
    };
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAccomplishmentChange = (id: string | null) => {
    const selected = rawAccomplishments.find((a) => a._id === id);
    if (selected) {
      setForm((prev: any) => ({
        ...prev,
        accomplishmentId: id as any,
        accomplishmentRemarks1: selected.accomplishment1 || "N/A",
        accomplishmentRemarks2: selected.accomplishment2 || "N/A",
        accomplishmentRemarks3: selected.accomplishment3 || "N/A",
        accomplishmentRemarks4: selected.accomplishment4 || "N/A",
        accomplishmentRemarks5: selected.accomplishment5 || "N/A",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      sectionScore1: parseFloat(calculations.s1Score),
      sectionPercent1: parseFloat(calculations.s1Percent),
      sectionScore2: parseFloat(calculations.s2Score),
      sectionPercent2: parseFloat(calculations.s2Percent),
      sectionScore3: parseFloat(calculations.s3Score),
      sectionPercent3: parseFloat(calculations.s3Percent),
      finalScore: parseFloat(calculations.finalScore),
      finalPercent: parseFloat(calculations.finalPercent),
    };
    try {
      const res = await fetch(
        isEditMode
          ? `/api/production/evaluation/${initialData._id}`
          : "/api/production/evaluation",
        {
          method: isEditMode ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Saved Successfully");
      router.push("/production/evaluation");
    } catch {
      toast.error("Error saving evaluation");
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-32 px-4">
      {/* STICKY HEADER */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-4 rounded-2xl border sticky top-4 z-40 shadow-xl mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-all"
        >
          <ArrowLeft size={20} /> Return
        </button>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-4">
            <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <p className="text-[10px] uppercase font-bold text-blue-400 leading-none">
                Final Score
              </p>
              <p className="text-lg font-black text-blue-700 leading-none mt-1">
                {calculations.finalScore}
              </p>
            </div>
            <div className="px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
              <p className="text-[10px] uppercase font-bold text-emerald-400 leading-none">
                Rating
              </p>
              <p className="text-lg font-black text-emerald-700 leading-none mt-1">
                {calculations.finalPercent}%
              </p>
            </div>
          </div>
          {currentStep === STEPS.length - 1 ? (
            <Button
              variant="success"
              type="submit"
              label={loading ? "Saving..." : "Submit Evaluation"}
              icon={Save}
              disabled={loading}
            />
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white font-semibold px-4 py-2 rounded-xl transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* STEP PROGRESS BAR */}
      <StepProgressBar
        steps={STEPS}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      {/* STEP CONTENT */}
      {currentStep === 0 && (
        <PersonnelStep
          form={form}
          handleChange={handleChange}
          userOptions={userOptions}
          setForm={setForm}
        />
      )}
      {currentStep === 1 && (
        <JobFunctionsStep
          form={form}
          handleChange={handleChange}
          s1Percent={calculations.s1Percent}
        />
      )}
      {currentStep === 2 && (
        <CompetenciesStep
          form={form}
          handleChange={handleChange}
          s2Percent={calculations.s2Percent}
        />
      )}
      {currentStep === 3 && (
        <AccomplishmentsStep
          form={form}
          handleChange={handleChange}
          accomplishmentOptions={accomplishmentOptions}
          handleAccomplishmentChange={handleAccomplishmentChange}
          s3Percent={calculations.s3Percent}
        />
      )}
      {currentStep === 4 && (
        <SummaryStep
          form={form}
          calculations={calculations}
          userOptions={userOptions}
        />
      )}

      {/* BOTTOM NAV */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        {currentStep < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <Button
            variant="success"
            type="submit"
            label={loading ? "Saving..." : "Submit Evaluation"}
            icon={Save}
            disabled={loading}
          />
        )}
      </div>
    </form>
  );
}
