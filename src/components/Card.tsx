"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[30px] border border-[#FFFFFF]/20 bg-[#071426] p-6 text-[#FFFFFF] shadow-2xl shadow-black/50 backdrop-blur-xl">
      {children}
    </div>
  );
}