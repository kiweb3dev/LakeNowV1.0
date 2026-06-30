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
    <div className="group text-[#FFFFFF]">
      <label className="mb-2 block text-left text-xs font-black uppercase tracking-[0.16em] text-[#FFFFFF]/70 transition group-focus-within:text-[#19C6FF]">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full rounded-[18px] border border-[#FFFFFF]/12
          bg-[#050B14]/75 px-4 py-4
          text-left text-base font-semibold text-[#FFFFFF]
          placeholder:text-[#FFFFFF]/38
          outline-none transition-all duration-200
          focus:border-[#19C6FF] focus:bg-[#071426]
          focus:shadow-[0_0_0_4px_rgba(25,198,255,0.10),0_18px_36px_rgba(0,0,0,0.18)]
          ${className}
        `}
      />
    </div>
  );
}
