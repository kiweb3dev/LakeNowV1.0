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
    <div>
      <label className="mb-2 block text-center text-sm font-bold text-white">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full rounded-2xl border border-white/15
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