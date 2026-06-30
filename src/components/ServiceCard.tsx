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
        group w-full rounded-[24px]
        border border-[#FFFFFF]/10
        bg-[#071426]
        p-4 text-[#FFFFFF]
        shadow-lg shadow-black/20
        transition-all duration-150
        hover:border-[#19C6FF]/70
        active:scale-[0.985]
      "
    >
      <div className="flex items-center gap-4 text-left">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
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
          className="shrink-0 text-[#FFFFFF]/70 transition group-active:translate-x-0.5"
          size={24}
          strokeWidth={2.8}
        />
      </div>
    </button>
  );
}
