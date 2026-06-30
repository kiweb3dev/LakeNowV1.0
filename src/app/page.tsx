"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Waves,
  ArrowRight,
} from "lucide-react";

import PageContainer from "@/components/PageContainer";
import { supabase } from "@/lib/supabase";

const BETA_COUNTER_START_AT =
  process.env.NEXT_PUBLIC_BETA_COUNTER_START_AT ?? "2026-06-30T05:25:08.000Z";

export default function Home() {
  const router = useRouter();
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    async function getCount() {
      const { data, error } = await supabase
        .from("requests")
        .select("phone")
        .gte("created_at", BETA_COUNTER_START_AT)
        .neq("type", "beta_feedback");

      if (error || !data) return;

      const uniquePhones = new Set(
        data
          .map((request: { phone: string | null }) => request.phone?.trim())
          .filter(Boolean)
      );

      setRequestCount(uniquePhones.size);
    }

    getCount();
  }, []);

  const goal = 100;
  const percent = Math.min(Math.round((requestCount / goal) * 100), 100);

  return (
    <PageContainer activeTab="home" showNav>
      <div className="flex flex-1 flex-col justify-between pb-2">
        <div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FFFFFF]">
                LAKENOW
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[#FFFFFF]/65">
                Rides - Delivery - At The Lake
              </p>
            </div>

            <div className="rounded-full border border-[#FFFFFF]/10 bg-[#071426] px-3 py-2 text-right">
              <p className="text-sm font-black text-[#FFFFFF]">
                Beta
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#FFFFFF]/55">
                Live
              </p>
            </div>
          </div>

          <div className="mt-11">
            <h1 className="text-[46px] font-black leading-[0.95] tracking-tight text-[#FFFFFF]">
              Ready to
              <br />
              get moving?
            </h1>

            <p className="mt-4 max-w-xs text-sm font-semibold uppercase tracking-[0.18em] leading-relaxed text-[#FFFFFF]/70">
              Land or water. Ride or delivery.
            </p>
          </div>

          <div className="mt-7 rounded-[26px] border border-[#FFFFFF]/10 bg-[#071426] p-5 shadow-xl shadow-black/25">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#19C6FF]">
                  LakeNow Beta Requests
                </p>
                <p className="mt-2 text-4xl font-black leading-none text-[#FFFFFF]">
                  {requestCount}
                  <span className="text-xl text-[#FFFFFF]/45">/{goal}</span>
                </p>
              </div>

              <p className="pb-1 text-right text-xs font-black uppercase tracking-[0.12em] text-[#FFFFFF]/55">
                {percent}% complete
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#0D1626]">
              <div
                className="h-full rounded-full bg-[#0A84FF] transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="mt-3 text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
              At 100 beta requests, LakeNow launches publicly.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => router.push("/around-town")}
              className="group w-full rounded-[26px] border border-[#FFFFFF]/10 bg-[#071426] p-5 text-left shadow-xl shadow-black/25 transition-all duration-150 active:scale-[0.985]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
                  <Car size={34} strokeWidth={2.5} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFFFFF]">
                    Land
                  </p>

                  <h2 className="mt-1 text-2xl font-black leading-tight text-[#FFFFFF]">
                    Land
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#FFFFFF]/70">
                    Request a ride or delivery by road.
                  </p>
                </div>

                <ArrowRight
                  className="text-[#FFFFFF]/70 transition group-active:translate-x-0.5"
                  size={24}
                  strokeWidth={2.8}
                />
              </div>
            </button>

            <button
              onClick={() => router.push("/on-the-lake")}
              className="group w-full rounded-[26px] border border-[#FFFFFF]/10 bg-[#071426] p-5 text-left shadow-xl shadow-black/25 transition-all duration-150 active:scale-[0.985]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
                  <Waves size={34} strokeWidth={2.5} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFFFFF]">
                    Water
                  </p>

                  <h2 className="mt-1 text-2xl font-black leading-tight text-[#FFFFFF]">
                    Water
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-[#FFFFFF]/70">
                    Request a ride, delivery, or captain.
                  </p>
                </div>

                <ArrowRight
                  className="text-[#FFFFFF]/70 transition group-active:translate-x-0.5"
                  size={24}
                  strokeWidth={2.8}
                />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-[26px] border border-[#FFFFFF]/10 bg-[#071426] p-5 shadow-xl shadow-black/25">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-black text-[#FFFFFF]">
                Available Today
              </p>
              <p className="mt-1 text-sm font-semibold text-[#FFFFFF]/70">
                Serving Lake of the Ozarks
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#0D1626] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#19C6FF]" />
              <span className="text-xs font-black uppercase text-[#FFFFFF]">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
