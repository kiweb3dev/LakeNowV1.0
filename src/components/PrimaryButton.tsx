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
        relative w-full overflow-hidden rounded-2xl
        bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500
        px-6 py-4
        text-base font-extrabold text-white
        shadow-lg shadow-blue-950/50
        transition-all duration-200
        active:scale-[0.97]
        hover:shadow-blue-800/50
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 opacity-0 transition hover:opacity-100 bg-white/10" />
    </button>
  );
}