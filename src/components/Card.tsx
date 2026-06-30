"use client";

import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`premium-card rounded-[24px] border border-[#FFFFFF]/10 p-5 text-[#FFFFFF] shadow-xl shadow-black/25 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
