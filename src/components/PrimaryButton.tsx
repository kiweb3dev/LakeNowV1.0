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
        w-full rounded-2xl
        bg-gradient-to-r from-blue-700 to-blue-500
        px-6 py-4
        text-base font-bold text-white
        shadow-lg shadow-blue-950/40
        transition active:scale-[0.98]
        hover:from-blue-600 hover:to-blue-400
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
}