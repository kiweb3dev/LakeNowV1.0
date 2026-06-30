"use client";

import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[24px] border border-[#FFFFFF]/10 bg-[#071426] p-5 text-[#FFFFFF] shadow-lg shadow-black/20 backdrop-blur-xl">
      {children}
    </div>
  );
}
