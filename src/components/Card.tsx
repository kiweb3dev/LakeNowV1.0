"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071426]/90 p-5 shadow-xl shadow-black/40">
      {children}
    </div>
  );
}