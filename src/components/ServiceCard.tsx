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
        border border-white/20
        bg-white/[0.08]
        p-7 text-white
        shadow-2xl shadow-black/40
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-blue-300
        hover:bg-white/[0.12]
        active:scale-[0.97]
      "
    >
      <div className="flex flex-col items-center">
        <div
          className="
            mb-5 flex h-20 w-20 items-center justify-center rounded-full
            bg-gradient-to-br from-blue-400 to-blue-700
            text-white shadow-xl shadow-blue-900/50
            transition duration-300 group-hover:scale-110
          "
        >
          {icon}
        </div>

        <h2 className="text-2xl font-black tracking-tight text-white">
          {title}
        </h2>

        <p className="mt-3 max-w-[270px] text-center text-base leading-7 text-white">
          {description}
        </p>

        <div className="mt-5 text-3xl font-black text-white transition-transform group-hover:translate-x-1">
          →
        </div>
      </div>
    </button>
  );
}