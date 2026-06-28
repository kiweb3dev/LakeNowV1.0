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
    <div className="text-[#FFFFFF]">
      <label className="mb-2 block text-left text-sm font-black text-[#FFFFFF]">
        {label}
      </label>

      <input
        {...props}
        className={`
          min-h-14 w-full rounded-2xl border border-[#FFFFFF]/25
          bg-[#071426] px-5 py-4
          text-left text-lg font-semibold text-[#FFFFFF]
          placeholder:text-[#FFFFFF]
          outline-none transition-all duration-200
          focus:border-[#19C6FF] focus:bg-[#071426]
          focus:shadow-lg focus:shadow-[#0A84FF]/35
          ${className}
        `}
      />
    </div>
  );
}