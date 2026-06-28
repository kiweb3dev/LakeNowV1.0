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
      <label className="mb-2 block text-left text-sm font-black text-white">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full rounded-2xl border border-white/25
          bg-[#0B1B31] px-5 py-4
          text-left text-lg font-semibold text-white
          placeholder:text-white/70
          outline-none transition-all duration-200
          focus:border-blue-300 focus:bg-[#102746]
          focus:shadow-lg focus:shadow-blue-950/50
          ${className}
        `}
      />
    </div>
  );
}