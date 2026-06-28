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
        px-6 py-5 text-lg font-black text-white
        shadow-xl shadow-blue-950/55
        transition-all duration-200 active:scale-[0.97]
        hover:from-blue-600 hover:via-blue-500 hover:to-blue-400
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 opacity-0 transition hover:opacity-100 bg-white/10" />
    </button>
  );
}