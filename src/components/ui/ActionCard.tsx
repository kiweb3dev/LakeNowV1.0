"use client";

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ActionCardProps {
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

export default function ActionCard({
  label,
  title,
  description,
  icon,
  onClick,
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group w-full rounded-[26px]
        border border-[#FFFFFF]/12
        bg-[#071426]
        p-5 text-left text-[#FFFFFF]
        shadow-xl shadow-black/30
        transition-all duration-150
        hover:border-[#19C6FF]/80
        active:scale-[0.985]
      "
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#FFFFFF]">
            {label}
          </p>

          <h2 className="mt-1 whitespace-pre-line text-2xl font-black leading-tight text-[#FFFFFF]">
            {title}
          </h2>

          <p className="mt-2 text-sm font-semibold leading-relaxed text-[#FFFFFF]">
            {description}
          </p>
        </div>

        <ArrowRight
          className="shrink-0 text-[#FFFFFF] transition group-active:translate-x-1"
          size={24}
          strokeWidth={2.8}
        />
      </div>
    </button>
  );
}