"use client";

import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0A0F1A] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-7">
        {children}
      </div>
    </main>
  );
}