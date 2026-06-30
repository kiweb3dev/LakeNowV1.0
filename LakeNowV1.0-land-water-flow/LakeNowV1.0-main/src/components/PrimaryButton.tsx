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
        bg-[#0A84FF]
        px-7 py-4 text-base font-black text-[#FFFFFF]
        shadow-xl shadow-[#0A84FF]/30
        transition-all duration-150
        active:scale-[0.985]
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      <span className="relative z-10 text-[#FFFFFF]">{children}</span>
    </button>
  );
}
