"use client";

import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, className = "", ...props }: TextInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white/80">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full rounded-2xl border border-white/10
          bg-white/[0.08] px-5 py-4
          text-white placeholder:text-white/35
          outline-none transition
          focus:border-blue-500 focus:bg-white/[0.12]
          ${className}
        `}
      />
    </div>
  );
}