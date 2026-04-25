import { forwardRef, ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: LucideIcon;
  iconSize?: number;
  variant: "success" | "danger" | "info" | "warning";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, icon: Icon, iconSize, variant, className, ...props }, ref) => {
    const variantStyles = {
      success: "bg-green-500 text-white hover:bg-green-600 ",
      danger: "bg-red-500 text-white hover:bg-red-600 ",
      info: "bg-blue-500 text-white hover:bg-blue-600 ",
      warning: "bg-yellow-500 text-black hover:bg-yellow-600 ",
    };

    return (
      <button
        ref={ref}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <Icon className={`${className}`} />
        <span>{label}</span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
