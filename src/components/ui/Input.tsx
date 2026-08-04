import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={inputId} className="label">
        {label}
      </label>
      <input id={inputId} className={clsx("input", error && "border-coral-500", className)} {...props} />
      {error && <p className="mt-1.5 text-sm text-coral-500">{error}</p>}
    </div>
  );
}
