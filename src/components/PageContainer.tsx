"use client";

import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D1626] text-[#FFFFFF]">
      <div className="pointer-events-none fixed -top-28 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#0A84FF]/35 blur-3xl" />
      <div className="pointer-events-none fixed bottom-[-80px] right-[-80px] h-80 w-80 rounded-full bg-[#19C6FF]/20 blur-3xl" />

      <div
        className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-7"
        style={{ animation: "pageIn 150ms ease-out both" }}
      >
        {children}
      </div>

      <style jsx global>{`
        @keyframes pageIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}