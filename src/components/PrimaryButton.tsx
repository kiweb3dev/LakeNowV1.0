"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        relative w-full overflow-hidden rounded-full
        bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500
        px-7 py-5 text-lg font-black text-white
        shadow-2xl shadow-blue-950/70
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-blue-800/60
        active:scale-[0.97]
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      <span className="relative z-10 text-white">{children}</span>
      <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
    </button>
  );
}