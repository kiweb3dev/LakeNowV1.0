"use client";

import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020817] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.22),_transparent_38%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-7">
        {children}
      </div>
    </main>
  );
}