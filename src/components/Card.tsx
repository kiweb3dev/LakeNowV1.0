"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-[#071426]/95 p-5 text-white shadow-2xl shadow-black/40 backdrop-blur">
      {children}
    </div>
  );
}