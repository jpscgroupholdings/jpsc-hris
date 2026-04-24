"use client";

import { forwardRef, useState, InputHTMLAttributes } from "react";
import { EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react";

interface InputFieldsProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  icon?: LucideIcon;
  showPassword?: boolean;
  type: string;
}

const InputFields = forwardRef<HTMLInputElement, InputFieldsProps>(
  ({ label, hint, icon: Icon, showPassword, type, ...props }, ref) => {
    const [eyes, setEyes] = useState(false);

    const inputType =
      type === "password" && showPassword ? (eyes ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1 w-full">
        <label>{label}</label>

        <div className="flex items-center border  px-2 py-1 rounded border-jpsc-500 bg-jpsc-900">
          {Icon && <Icon className="mr-2 text-jpsc-50" />}

          <input
            ref={ref}
            type={inputType}
            {...props}
            className="flex-1 outline-none text-jpsc-50"
          />

          {showPassword && type === "password" && (
            <button
              type="button"
              onClick={() => setEyes(!eyes)}
              className="text-jpsc-50"
            >
              {eyes ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>

        {hint && <span className="text-xs">{hint}</span>}
      </div>
    );
  },
);

InputFields.displayName = "InputFields";

export default InputFields;
