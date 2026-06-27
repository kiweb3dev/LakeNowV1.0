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
    <div className="w-full">
      <label className="mb-2 block text-sm font-semibold text-white/80">
        {label}
      </label>

      <textarea
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-white/15
          bg-white/10
          px-5
          py-4
          text-white
          placeholder:text-white/40
          outline-none
          transition
          focus:border-blue-500
          focus:bg-white/15
          ${className}
        `}
      />
    </div>
  );
}