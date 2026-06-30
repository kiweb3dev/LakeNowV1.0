"use client";

import { useRouter } from "next/navigation";
import {
  Car,
  Waves,
  ArrowRight,
} from "lucide-react";

import PageContainer from "@/components/PageContainer";
import Logo from "@/components/Logo";

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer activeTab="home" showNav>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <Logo size={148} className="-ml-3" />

          <div className="premium-card rounded-full border border-[#19C6FF]/25 px-4 py-2 text-right shadow-lg shadow-black/20">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-[#FFFFFF]">
              <span className="live-dot h-2 w-2 rounded-full bg-[#19C6FF]" />
              Beta
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h1 className="text-[44px] font-black leading-[0.95] tracking-tight text-[#FFFFFF]">
            Ready to
            <br />
            get moving?
          </h1>

          <p className="mt-4 max-w-xs text-sm font-semibold uppercase tracking-[0.18em] leading-relaxed text-[#FFFFFF]/70">
            Land or water. Ride or delivery.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <button
            onClick={() => router.push("/around-town")}
            className="interactive-card premium-card tap-card group w-full rounded-[24px] border border-[#FFFFFF]/10 p-4 text-left shadow-xl shadow-black/25 transition-all duration-200 hover:border-[#19C6FF]/60"
          >
            <div className="flex items-center gap-4">
              <div className="logo-action-icon float-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] text-[#FFFFFF] shadow-lg transition group-active:scale-95">
                <Car size={31} strokeWidth={2.5} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#FFFFFF]/65">
                  Land
                </p>

                <h2 className="mt-1 text-[22px] font-black leading-tight text-[#FFFFFF]">
                  Land
                </h2>
                <p className="mt-1 text-sm font-semibold text-[#FFFFFF]/70">
                  Request a ride or delivery by road.
                </p>
              </div>

              <ArrowRight
                className="text-[#19C6FF] transition duration-200 group-hover:translate-x-0.5 group-active:translate-x-1"
                size={22}
                strokeWidth={2.8}
              />
            </div>
          </button>

          <button
            onClick={() => router.push("/on-the-lake")}
            className="interactive-card premium-card tap-card group w-full rounded-[24px] border border-[#FFFFFF]/10 p-4 text-left shadow-xl shadow-black/25 transition-all duration-200 hover:border-[#19C6FF]/60"
          >
            <div className="flex items-center gap-4">
              <div className="logo-action-icon float-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] text-[#FFFFFF] shadow-lg transition group-active:scale-95">
                <Waves size={31} strokeWidth={2.5} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#FFFFFF]/65">
                  Water
                </p>

                <h2 className="mt-1 text-[22px] font-black leading-tight text-[#FFFFFF]">
                  Water
                </h2>
                <p className="mt-1 text-sm font-semibold text-[#FFFFFF]/70">
                  Request a ride, delivery, or captain.
                </p>
              </div>

              <ArrowRight
                className="text-[#19C6FF] transition duration-200 group-hover:translate-x-0.5 group-active:translate-x-1"
                size={22}
                strokeWidth={2.8}
              />
            </div>
          </button>
        </section>

      </div>
    </PageContainer>
  );
}
