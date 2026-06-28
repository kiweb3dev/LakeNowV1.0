"use client";

import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6">
        {children}
      </div>
    </main>
  );
}