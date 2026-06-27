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
        w-full
        rounded-3xl
        border border-white/10
        bg-white/[0.06]
        p-5
        transition-all
        hover:border-blue-500/50
        hover:bg-white/[0.09]
        active:scale-[0.98]
      "
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl">
          {icon}
        </div>

        <div className="flex-1 text-left">
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-white/65">
            {description}
          </p>
        </div>

        <div className="text-2xl text-white/40">
          →
        </div>
      </div>
    </button>
  );
}