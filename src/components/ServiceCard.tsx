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
        group w-full rounded-3xl border p-6 text-center
        transition-all duration-200 active:scale-[0.97]
        ${
          active
            ? "border-blue-400 bg-gradient-to-b from-blue-600 to-blue-800 shadow-lg shadow-blue-900/40"
            : "border-white/15 bg-[#071426] shadow-lg shadow-black/30 hover:border-blue-500/70 hover:bg-[#0B1B31]"
        }
      `}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-600/30 text-blue-200 shadow-md shadow-blue-950/50 transition group-hover:scale-110 group-hover:bg-blue-600/50">
        {icon}
      </div>

      <h3 className="text-xl font-extrabold text-white">{title}</h3>

      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white">
        {description}
      </p>

      <div className="mt-4 text-2xl text-blue-400 transition group-hover:translate-x-1">
        →
      </div>
    </button>
  );
}