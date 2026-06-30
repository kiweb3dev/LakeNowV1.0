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
    <div className="flex flex-1 flex-col pt-1">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
          {icon}
        </div>

        <div className="min-w-0">
          <h1 className="text-[30px] font-black leading-none tracking-tight text-[#FFFFFF]">
            {title}
          </h1>

          <p className="mt-2 text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
            {subtitle}
          </p>
        </div>
      </div>

      <Card>{children}</Card>
    </div>
  );
}
