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
    <div className="text-[#FFFFFF]">
      <label className="mb-2 block text-left text-xs font-black uppercase tracking-[0.16em] text-[#FFFFFF]/70">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full rounded-[18px] border border-[#FFFFFF]/10
          bg-[#0D1626] px-4 py-4
          text-left text-base font-semibold text-[#FFFFFF]
          placeholder:text-[#FFFFFF]/38
          outline-none transition-all duration-150
          focus:border-[#19C6FF] focus:bg-[#071426]
          focus:shadow-lg focus:shadow-[#0A84FF]/20
          ${className}
        `}
      />
    </div>
  );
}
