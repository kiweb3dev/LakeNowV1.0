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
        shine-button relative w-full overflow-hidden rounded-full
        bg-gradient-to-r from-[#006BEA] via-[#0A84FF] to-[#19C6FF]
        px-7 py-4 text-base font-black text-[#FFFFFF]
        shadow-xl shadow-[#0A84FF]/35
        transition-all duration-200
        hover:shadow-[#19C6FF]/25
        active:scale-[0.975]
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      <span className="relative z-10 text-[#FFFFFF]">{children}</span>
    </button>
  );
}
