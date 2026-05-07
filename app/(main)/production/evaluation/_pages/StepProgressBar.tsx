import { Check, LucideIcon } from "lucide-react";

interface Step {
  id: number;
  label: string;
  icon: LucideIcon;
  color: string;
}

interface StepProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (idx: number) => void;
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500 border-blue-500 text-white",
  orange: "bg-orange-500 border-orange-500 text-white",
  emerald: "bg-emerald-500 border-emerald-500 text-white",
  purple: "bg-purple-500 border-purple-500 text-white",
  indigo: "bg-indigo-500 border-indigo-500 text-white",
};

const RING_MAP: Record<string, string> = {
  blue: "ring-2 ring-blue-300",
  orange: "ring-2 ring-orange-300",
  emerald: "ring-2 ring-emerald-300",
  purple: "ring-2 ring-purple-300",
  indigo: "ring-2 ring-indigo-300",
};

export default function StepProgressBar({ steps, currentStep, onStepClick }: StepProgressBarProps) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-4 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === currentStep;
          const isDone = idx < currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => onStepClick(idx)}
                className="flex flex-col items-center gap-1 group"
              >
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all
                    ${isDone
                      ? COLOR_MAP[step.color]
                      : isActive
                      ? `${COLOR_MAP[step.color]} ${RING_MAP[step.color]}`
                      : "border-gray-200 text-gray-300 bg-white"
                    }`}
                >
                  {isDone ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide hidden sm:block
                    ${isActive ? "text-gray-800" : isDone ? "text-gray-500" : "text-gray-300"}`}
                >
                  {step.label}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    idx < currentStep ? "bg-gray-400" : "bg-gray-100"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
