"use client";

import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">

        {children}

      </div>

    </main>
  );
}