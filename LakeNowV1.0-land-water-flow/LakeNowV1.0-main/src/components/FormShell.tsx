"use client";

import { ReactNode } from "react";
import Card from "@/components/Card";

interface FormShellProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function FormShell({
  icon,
  title,
  subtitle,
  children,
}: FormShellProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto mb-4 mt-2 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
        {icon}
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-[34px] font-black leading-none tracking-tight text-[#FFFFFF]">
          {title}
        </h1>

        <p className="mx-auto mt-3 max-w-xs text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
          {subtitle}
        </p>
      </div>

      <Card>{children}</Card>
    </div>
  );
}
