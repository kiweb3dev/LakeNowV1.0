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
    <div className="flex flex-1 flex-col justify-center">
      <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#0A84FF] to-[#19C6FF] text-[#FFFFFF] shadow-2xl shadow-[#0A84FF]/40">
        {icon}
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-tight text-[#FFFFFF]">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-lg font-semibold leading-relaxed text-[#FFFFFF]">
          {subtitle}
        </p>
      </div>

      <Card>{children}</Card>
    </div>
  );
}