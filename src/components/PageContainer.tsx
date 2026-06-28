"use client";

import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D1626] text-[#FFFFFF]">
      <div className="pointer-events-none fixed -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#0A84FF]/30 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-72 w-72 rounded-full bg-[#19C6FF]/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-7">
        {children}
      </div>
    </main>
  );
}