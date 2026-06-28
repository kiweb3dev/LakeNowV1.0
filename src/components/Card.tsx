"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/20 bg-[#071426]/95 p-6 text-white shadow-2xl shadow-black/50 backdrop-blur-md">
      {children}
    </div>
  );
}