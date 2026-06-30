"use client";

import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

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
        premium-card tap-card group w-full rounded-[24px]
        border border-[#FFFFFF]/10
        p-4 text-[#FFFFFF]
        shadow-xl shadow-black/25
        transition-all duration-200
        hover:border-[#19C6FF]/70 hover:shadow-[#0A84FF]/20
      "
    >
      <div className="flex items-center gap-4 text-left">
        <div className="logo-action-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] text-[#FFFFFF] shadow-lg transition duration-200 group-active:scale-95">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[22px] font-black leading-tight tracking-tight text-[#FFFFFF]">
            {title}
          </h2>

          <p className="mt-1.5 text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
            {description}
          </p>
        </div>

        <ChevronRight
          className="shrink-0 text-[#19C6FF] transition duration-200 group-hover:translate-x-0.5 group-active:translate-x-1"
          size={24}
          strokeWidth={2.8}
        />
      </div>
    </button>
  );
}
