"use client";

import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function TextArea({
  label,
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <div className="group">
      <label className="mb-2 block text-sm font-bold text-white/90">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full rounded-xl border border-white/10
          bg-[#071426] px-4 py-3
          text-base text-white placeholder:text-white/35
          outline-none transition-all duration-200
          focus:border-blue-500 focus:bg-[#0B1B31] focus:shadow-md focus:shadow-blue-950/40
          ${className}
        `}
      />
    </div>
  );
}