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
        group w-full rounded-[30px]
        border border-[#FFFFFF]/20
        bg-[#071426]
        p-7 text-[#FFFFFF]
        shadow-2xl shadow-black/40
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#19C6FF]
        hover:bg-[#071426]
        active:scale-[0.97]
      "
    >
      <div className="flex flex-col items-center">
        <div
          className="
            mb-5 flex h-20 w-20 items-center justify-center rounded-full
            bg-gradient-to-br from-[#0A84FF] to-[#19C6FF]
            text-[#FFFFFF] shadow-xl shadow-[#0A84FF]/40
            transition duration-300 group-hover:scale-110
          "
        >
          {icon}
        </div>

        <h2 className="text-2xl font-black tracking-tight text-[#FFFFFF]">
          {title}
        </h2>

        <p className="mt-3 max-w-[270px] text-center text-base leading-7 text-[#FFFFFF]">
          {description}
        </p>

        <div className="mt-5 text-3xl font-black text-[#FFFFFF] transition-transform group-hover:translate-x-1">
          →
        </div>
      </div>
    </button>
  );
}