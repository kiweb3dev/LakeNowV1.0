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
    <div className="group">
      <label className="mb-2 block text-sm font-bold text-white/90">
        {label}
      </label>

      <input
        {...props}
        className={`
          h-12 w-full rounded-xl border border-white/10
          bg-[#071426] px-4
          text-base text-white placeholder:text-white/35
          outline-none transition-all duration-200
          focus:border-blue-500 focus:bg-[#0B1B31] focus:shadow-md focus:shadow-blue-950/40
          ${className}
        `}
      />
    </div>
  );
}