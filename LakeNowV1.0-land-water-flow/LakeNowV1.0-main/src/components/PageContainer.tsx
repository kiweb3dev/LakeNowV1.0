"use client";

import type { ReactNode } from "react";
import BetaBanner from "@/components/BetaBanner";
import BottomNav from "@/components/BottomNav";

type NavTab = "home" | "land" | "water" | "profile";

interface PageContainerProps {
  children: ReactNode;
  activeTab?: NavTab;
  showBeta?: boolean;
  showNav?: boolean;
}

export default function PageContainer({
  children,
  activeTab,
  showBeta = true,
  showNav = false,
}: PageContainerProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D1626] text-[#FFFFFF]">
      <div className="pointer-events-none fixed -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0A84FF]/18 blur-3xl" />

      <div
        className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-5 py-6"
        style={{ animation: "pageIn 150ms ease-out both" }}
      >
        {showBeta && <BetaBanner />}
        {children}
        {showNav && <BottomNav active={activeTab} />}
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
