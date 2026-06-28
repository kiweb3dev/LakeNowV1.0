"use client";

import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  active?: boolean;
}

export default function ServiceCard({
  icon,
  title,
  description,
  onClick,
  active = false,
}: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full rounded-[2rem] border p-6 text-center
        text-white transition-all duration-200 active:scale-[0.97]
        ${
          active
            ? "border-blue-300 bg-gradient-to-b from-blue-500 to-blue-800 shadow-xl shadow-blue-900/50"
            : "border-white/15 bg-[#071426]/95 shadow-xl shadow-black/35 hover:border-blue-400 hover:bg-[#0B1B31]"
        }
      `}
    >
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-blue-300 bg-blue-500/25 text-white shadow-lg shadow-blue-950/50 transition group-hover:scale-110 group-hover:bg-blue-500/40">
        {icon}
      </div>

      <h3 className="text-2xl font-black text-white">{title}</h3>

      <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-white">
        {description}
      </p>

      <div className="mt-5 text-3xl font-black text-blue-300 transition group-hover:translate-x-1">
        →
      </div>
    </button>
  );
}