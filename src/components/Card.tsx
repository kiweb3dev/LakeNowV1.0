"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[30px] border border-white/20 bg-white/[0.08] p-6 text-white shadow-2xl shadow-black/50 backdrop-blur-xl">
      {children}
    </div>
  );
}