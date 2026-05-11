"use client";

import { forwardRef, useState, InputHTMLAttributes } from "react";
import { EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  icon?: LucideIcon;
  showPassword?: boolean;
  type: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, hint, icon: Icon, showPassword, type, ...props }, ref) => {
    const [eyes, setEyes] = useState(false);

    const inputType =
      type === "password" && showPassword ? (eyes ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1 w-full py-2">
        <label className="block text-[11px] font-bold font-sans text-azure-950 uppercase tracking-widest mb-2 ml-1">
          {label}
        </label>

        {/* CHANGE: Added 'focus-within:ring-2' and 'focus-within:border-gold-500'
            This makes the wrapper react when the internal <input> is focused.
        */}
        <div
          className="flex items-center border border-gray-300 rounded-lg shadow-sm px-3 py-2 transition-all
                        bg-white focus-within:ring-2 focus-within:ring-gold-500/30 focus-within:border-gold-500"
        >
          {Icon && <Icon size={18} className="mr-2 text-gray-800 shrink-0" />}

          <input
            ref={ref}
            type={inputType}
            {...props}
            className="flex-1 outline-none text-sm text-azure-950 bg-transparent placeholder:text-azure-950 font-sans"
          />

          {showPassword && type === "password" && (
            <button
              type="button"
              onClick={() => setEyes(!eyes)}
              className="ml-2 text-gray-500 hover:text-gold-600 transition-colors"
            >
              {eyes ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          )}
        </div>

        {hint && <span className="text-xs text-gray-500 mt-1">{hint}</span>}
      </div>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
