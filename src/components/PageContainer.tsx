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
  showBeta = false,
  showNav = false,
}: PageContainerProps) {
  const bottomPadding = showNav
    ? "calc(env(safe-area-inset-bottom) + 7rem)"
    : "calc(env(safe-area-inset-bottom) + 1.5rem)";

  return (
    <main className="app-bg relative min-h-dvh overflow-x-hidden text-[#FFFFFF]">
      <div className="pointer-events-none fixed -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0A84FF]/18 blur-3xl" />
      <div className="pointer-events-none fixed bottom-24 right-[-120px] h-72 w-72 rounded-full bg-[#19C6FF]/10 blur-3xl" />

      <div
        className="screen-pop relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4"
        style={{
          animation: "pageIn 150ms ease-out both",
          paddingBottom: bottomPadding,
          paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
        }}
      >
        {showBeta && <BetaBanner />}
        {children}
      </div>

      {showNav && <BottomNav active={activeTab} />}

      <style jsx global>{`
        html {
          background: #020407;
        }

        body {
          min-height: 100dvh;
          overscroll-behavior-y: none;
          -webkit-font-smoothing: antialiased;
        }

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
