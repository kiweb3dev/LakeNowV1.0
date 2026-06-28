"use client";

import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({
  label,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div>
      <label className="mb-2 block text-center text-sm font-bold text-white">
        {label}
      </label>

      <input
        {...props}
        className={`
          h-13 w-full rounded-2xl border border-white/15
          bg-[#071426] px-4 py-4
          text-center text-base text-white placeholder:text-white/60
          outline-none transition-all duration-200
          focus:border-blue-400 focus:bg-[#0B1B31] focus:shadow-md focus:shadow-blue-950/50
          ${className}
        `}
      />
    </div>
  );
}