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
        group relative w-full overflow-hidden rounded-2xl border p-4 text-left
        transition-all duration-200
        active:scale-[0.97]
        ${
          active
            ? "border-blue-400 bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg shadow-blue-900/40"
            : "border-white/10 bg-[#071426]/95 shadow-lg shadow-black/30 hover:border-blue-500/60 hover:bg-[#0B1B31]"
        }
      `}
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-r from-blue-600/10 to-transparent" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-blue-500 bg-blue-600/25 text-2xl shadow-md shadow-blue-950/40 transition group-hover:scale-105 group-hover:bg-blue-600/40">
          {icon}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-extrabold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-snug text-white/70">
            {description}
          </p>
        </div>

        <div className="text-3xl text-white/70 transition group-hover:translate-x-1 group-hover:text-white">
          ›
        </div>
      </div>
    </button>
  );
}