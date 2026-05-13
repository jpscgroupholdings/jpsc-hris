"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Target,
  User as UserIcon,
  ClipboardCheck,
  Calculator,
  Briefcase,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { SearchSelectOption } from "@/components/UI/SelectField";
import { Evaluation } from "@/models/performance/evaluation";

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

const LAST_INPUT_STEP = 3; // Step 3 has the submit button; Step 4 is read-only summary

export default function EvaluationForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // savedData is populated after a successful submit — passed to SummaryStep
  const [savedData, setSavedData] = useState<any>(initialData ?? null);

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
    optionalCompetencyDescription:
      initialData?.optionalCompetencyDescription || "",
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

  // Sync initialData into form (edit mode)
  useEffect(() => {
    if (initialData) {
      setForm({
        userId: initialData.userId?._id || initialData.userId || "",
        evaluatedBy:
          initialData.evaluatedBy?._id || initialData.evaluatedBy || "",
        evaluationDateStart: initialData.evaluationDateStart
          ? initialData.evaluationDateStart.split("T")[0]
          : "",
        evaluationDateEnd: initialData.evaluationDateEnd
          ? initialData.evaluationDateEnd.split("T")[0]
          : "",
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
        optionalCompetencyDescription:
          initialData.optionalCompetencyDescription || "",
        optionalCompetencyRemarks: initialData.optionalCompetencyRemarks || "",
        leadership: initialData.leadership || 0,
        leadershipRemarks: initialData.leadershipRemarks || "",
        subordinatesDevelopment: initialData.subordinatesDevelopment || 0,
        subordinatesDevelopmentRemarks:
          initialData.subordinatesDevelopmentRemarks || "",
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

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, aRes] = await Promise.all([
          fetch("/api/employee/user/"),
          fetch("/api/performance/accomplishment"),
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

  // When userId changes, fetch the user's designation and populate jobFunction1-12
  // from the designation's responsibility1-12 (skipped in edit mode to preserve saved data)
  useEffect(() => {
    if (!form.userId || isEditMode) return;

    const fetchDesignationResponsibilities = async () => {
      try {
        const res = await fetch(`/api/employee/user/${form.userId}`);
        if (!res.ok) return;
        const json = await res.json();
        const user = json.data ?? json;
        const designation = user.designationId;
        if (!designation) return;

        setForm((prev) => ({
          ...prev,
          jobFunction1: designation.responsibility1 || "",
          jobFunction2: designation.responsibility2 || "",
          jobFunction3: designation.responsibility3 || "",
          jobFunction4: designation.responsibility4 || "",
          jobFunction5: designation.responsibility5 || "",
          jobFunction6: designation.responsibility6 || "",
          jobFunction7: designation.responsibility7 || "",
          jobFunction8: designation.responsibility8 || "",
          jobFunction9: designation.responsibility9 || "",
          jobFunction10: designation.responsibility10 || "",
          jobFunction11: designation.responsibility11 || "",
          jobFunction12: designation.responsibility12 || "",
        }));
      } catch {
        toast.error("Failed to load designation responsibilities.");
      }
    };

    fetchDesignationResponsibilities();
  }, [form.userId, isEditMode]);

  // Score calculations (live, used for section score badges while filling form)
  const calculations = useMemo(() => {
    const s1Weighted =
      form.jobFunctionScore1! * 3 +
      form.jobFunctionScore2! * 3 +
      form.jobFunctionScore3! * 2 +
      form.jobFunctionScore4! * 2 +
      form.jobFunctionScore5! * 1 +
      form.jobFunctionScore6! * 1;
    const s1Score = s1Weighted / 12;
    const s1Percent = (s1Score / 5) * 100;

    // If optionalCompetencyDescription is filled, include optionalCompetency in divisor (/9 instead of /8)
    const hasOptionalCompetency = !!form.optionalCompetencyDescription?.trim();
    const s2Sum =
      form.jobKnowledge! +
      form.workQuality! +
      form.productivity! +
      form.versatility! +
      form.initiative! +
      form.cooperation! +
      form.dependability! +
      form.communication! +
      (hasOptionalCompetency ? form.optionalCompetency! : 0);
    const s2Divisor = hasOptionalCompetency ? 9 : 8;
    const s2Score = s2Sum / s2Divisor;
    const s2Percent = (s2Score / 5) * 100;

    const s3Weighted =
      form.accomplishmentScore1! * 3 +
      form.accomplishmentScore2! * 3 +
      form.accomplishmentScore3! * 2 +
      form.accomplishmentScore4! * 2 +
      form.accomplishmentScore5! * 1;
    const s3Score = s3Weighted / 11;
    const s3Percent = (s3Score / 5) * 100;

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  // Submit → save to DB → advance to Summary (step 4)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      evaluationDate: new Date().toISOString(), // auto today
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
          ? `/api/performance/evaluation/${initialData._id}`
          : "/api/performance/evaluation",
        {
          method: isEditMode ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Failed to save");

      const json = await res.json();
      // Store the response from DB so SummaryStep shows confirmed saved data
      setSavedData(json.data ?? payload);

      toast.success(
        isEditMode ? "Updated successfully!" : "Evaluation submitted!",
      );

      // Advance to Summary step
      setCurrentStep(4);
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
          jobFunctionsReadOnly
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
          loading={loading}
          isEditMode={isEditMode}
        />
      )}
      {currentStep === 4 && (
        <SummaryStep
          form={savedData}
          calculations={calculations}
          userOptions={userOptions}
        />
      )}

      {/* BOTTOM NAV — no submit button here, it lives inside AccomplishmentsStep */}
      <div className="flex justify-between mt-8">
        {/* Hide Previous on Summary step — evaluation already saved */}
        {currentStep < 4 && (
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} /> Previous
          </button>
        )}

        {/* Next button only for steps 0–2; step 3 has its own submit, step 4 is summary */}
        {currentStep < LAST_INPUT_STEP && (
          <button
            type="button"
            onClick={goNext}
            className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white font-semibold px-5 py-2.5 rounded-xl transition-all"
          >
            Next <ChevronRight size={16} />
          </button>
        )}

        {/* On Summary step, offer a "Back to list" escape */}
        {currentStep === 4 && (
          <button
            type="button"
            onClick={() => router.push("/performance/evaluation")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all ml-auto"
          >
            Done — Back to List <ChevronRight size={16} />
          </button>
        )}
      </div>
    </form>
  );
}
