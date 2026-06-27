"use client";

import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
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
        w-full
        rounded-3xl
        bg-blue-600
        py-5
        px-6
        text-lg
        font-bold
        text-white
        transition-all
        duration-200
        hover:bg-blue-500
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
        shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
}