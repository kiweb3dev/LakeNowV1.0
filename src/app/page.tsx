"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Waves,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";

import PageContainer from "@/components/PageContainer";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    async function getCount() {
      const { count } = await supabase
        .from("requests")
        .select("*", { count: "exact", head: true });

      setRequestCount(count || 0);
    }

    getCount();
  }, []);

  const goal = 250;

  return (
    <PageContainer>
      <div className="flex min-h-screen flex-col justify-between pb-2 pt-2">
        <div>
          <div className="rounded-[28px] border border-[#FFFFFF]/20 bg-[#071426] p-5 text-center shadow-2xl shadow-black/40">
            <p className="text-2xl font-black text-[#FFFFFF]">
              {requestCount} requests submitted
            </p>
            <p className="mt-1 text-sm font-bold text-[#FFFFFF]">
              Help us reach {goal}.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#FFFFFF]">
              LAKENOW
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-[#FFFFFF]">
              Rides • Delivery • At The Lake
            </p>
          </div>

          <div className="mt-10">
            <h1 className="text-6xl font-black leading-[0.92] tracking-tight text-[#FFFFFF]">
              Ready to
              <br />
              get moving?
            </h1>

            <p className="mt-6 max-w-sm text-xl font-semibold leading-relaxed text-[#FFFFFF]">
              Transportation and delivery across Lake of the Ozarks — by road or by water.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            <div className="rounded-3xl border border-[#FFFFFF]/20 bg-[#071426] p-4 text-center shadow-xl shadow-black/30">
              <Zap className="mx-auto text-[#FFFFFF]" size={24} />
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#FFFFFF]">
                Fast
              </p>
            </div>

            <div className="rounded-3xl border border-[#FFFFFF]/20 bg-[#071426] p-4 text-center shadow-xl shadow-black/30">
              <MapPin className="mx-auto text-[#FFFFFF]" size={24} />
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#FFFFFF]">
                Local
              </p>
            </div>

            <div className="rounded-3xl border border-[#FFFFFF]/20 bg-[#071426] p-4 text-center shadow-xl shadow-black/30">
              <Clock className="mx-auto text-[#FFFFFF]" size={24} />
              <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#FFFFFF]">
                On Demand
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <button
              onClick={() => router.push("/around-town")}
              className="group w-full rounded-[34px] border border-[#FFFFFF]/20 bg-[#071426] p-6 text-left shadow-2xl shadow-black/45 transition-all duration-200 active:scale-[0.97]"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#0A84FF] to-[#19C6FF] text-[#FFFFFF] shadow-xl shadow-[#0A84FF]/40">
                  <Car size={42} strokeWidth={2.5} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFFFFF]">
                    Land
                  </p>

                  <h2 className="mt-2 text-3xl font-black leading-tight text-[#FFFFFF]">
                    Car Rides
                    <br />& Delivery
                  </h2>
                </div>

                <ArrowRight
                  className="mt-2 text-[#FFFFFF] transition group-hover:translate-x-1"
                  size={28}
                  strokeWidth={2.8}
                />
              </div>
            </button>

            <button
              onClick={() => router.push("/on-the-lake")}
              className="group w-full rounded-[34px] border border-[#FFFFFF]/20 bg-[#071426] p-6 text-left shadow-2xl shadow-black/45 transition-all duration-200 active:scale-[0.97]"
            >
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#0A84FF] to-[#19C6FF] text-[#FFFFFF] shadow-xl shadow-[#0A84FF]/40">
                  <Waves size={42} strokeWidth={2.5} />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFFFFF]">
                    Water
                  </p>

                  <h2 className="mt-2 text-3xl font-black leading-tight text-[#FFFFFF]">
                    On The
                    <br />
                    Lake
                  </h2>
                </div>

                <ArrowRight
                  className="mt-2 text-[#FFFFFF] transition group-hover:translate-x-1"
                  size={28}
                  strokeWidth={2.8}
                />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-[30px] border border-[#FFFFFF]/20 bg-[#071426] p-5 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-black text-[#FFFFFF]">
                Available Today
              </p>
              <p className="mt-1 text-sm font-semibold text-[#FFFFFF]">
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