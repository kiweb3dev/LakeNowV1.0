"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="premium-card rounded-[24px] border border-[#FFFFFF]/10 p-5 text-[#FFFFFF] shadow-xl shadow-black/25 backdrop-blur-xl">
      {children}
    </div>
  );
}
