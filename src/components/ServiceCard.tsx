"use client";

import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export default function ServiceCard({
  icon,
  title,
  description,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group w-full rounded-[34px]
        border border-[#FFFFFF]/20
        bg-[#071426]
        px-7 py-8 text-[#FFFFFF]
        shadow-2xl shadow-black/50
        transition-all duration-200
        hover:-translate-y-1
        hover:border-[#19C6FF]
        active:scale-[0.97]
      "
    >
      <div className="flex flex-col items-start text-left">
        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#0A84FF] to-[#19C6FF] text-[#FFFFFF] shadow-2xl shadow-[#0A84FF]/40 transition group-hover:scale-105">
          {icon}
        </div>

        <h2 className="text-3xl font-black leading-tight tracking-tight text-[#FFFFFF]">
          {title}
        </h2>

        <p className="mt-4 text-lg font-semibold leading-relaxed text-[#FFFFFF]">
          {description}
        </p>

        <div className="mt-7 flex w-full items-center justify-between border-t border-[#FFFFFF]/15 pt-5">
          <span className="text-sm font-black uppercase tracking-[0.18em] text-[#FFFFFF]">
            Tap to continue
          </span>

          <span className="text-3xl font-black text-[#FFFFFF] transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </button>
  );
}