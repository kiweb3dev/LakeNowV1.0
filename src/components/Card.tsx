"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-black/30 backdrop-blur">
      {children}
    </div>
  );
}