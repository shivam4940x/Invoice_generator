import React, { useState } from "react";

interface AnimatedInputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  type?: "text" | "number"; // etc.
  disabled?: boolean;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value,
  name,
  type,
  disabled = false,
  className = "",
  onChange,
  onBlur,
}) => {
  const [focused, setFocused] = useState(false);
  const hasText = typeof value === "string" ? value.trim() !== "" : value !== 0;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      <label
        htmlFor={name}
        className={`
          absolute px-1 left-0 transition-all duration-300 -z-50 capitalize font-thin
          ${
            focused || hasText
              ? "top-[-0.75rem] text-xs text-white/50"
              : "top-2 text-base text-gray-200"
          }
        `}
      >
        {label}
      </label>

      {/* Input */}
      <input
        type={type || "text"}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        disabled={disabled}
        className="w-full border-b border-white/10 bg-transparent text-white placeholder-transparent focus:outline-none py-2 text-base px-1"
        placeholder={label}
        autoComplete="off"
      />

      {/* Border Animation */}
      <span
        className={`absolute bottom-0 left-0 h-[1px] bg-forground transition-all duration-500 ease-in-out w-full origin-left ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
      ></span>
    </div>
  );
};

interface AnimatedDateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
}

export const AnimatedDateInput: React.FC<AnimatedDateInputProps> = ({
  label,
  value,
  onChange,
  name,
  className,
}) => {
  const [focused, setFocused] = useState(false);
  const hasText = value.trim() !== "";

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      {/* Label */}
      <label
        htmlFor={name}
        className={`
          absolute px-1 left-0 transition-all duration-300 -z-50 capitalize font-thin
          ${
            focused || hasText
              ? "top-[-0.75rem] text-xs text-white/50"
              : "top-2 text-base text-gray-200"
          }
        `}
      >
        {label}
      </label>

      {/* Date Input */}
      <input
        type="date"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full border-b border-white/10 bg-transparent text-white placeholder-transparent focus:outline-none py-2 text-base px-1"
        placeholder={label}
        autoComplete="off"
      />

      {/* Bottom border animation */}
    </div>
  );
};

interface Option {
  label: string;
  value: string;
}
interface AnimatedSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}

export const AnimatedSelect: React.FC<AnimatedSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 bg-background border border-white/20 text-sm rounded-md appearance-none focus:outline-none focus:border-white/50"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-background">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="absolute left-2 -top-2 text-xs bg-background rounded-lg px-1 text-gray-200/80 font-light"
      >
        {label}
      </label>
    </div>
  );
};
