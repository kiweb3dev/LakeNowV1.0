"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface BetaCardProps {
  goal?: number;
}

export default function BetaCard({ goal = 100 }: BetaCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getBetaTesterCount() {
      const { data, error } = await supabase
        .from("requests")
        .select("phone");

      if (error || !data) return;

      const uniquePhones = new Set(
        data
          .map((request) => request.phone?.trim())
          .filter(Boolean)
      );

      setCount(Math.max(uniquePhones.size, 0));
    }

    getBetaTesterCount();
  }, []);

  const safeCount = Math.min(count, goal);
  const percent = Math.round((safeCount / goal) * 100);
  const remaining = Math.max(goal - safeCount, 0);

  return (
    <div className="mb-4 rounded-[30px] border border-[#FFFFFF]/20 bg-[#071426] p-5 text-[#FFFFFF] shadow-2xl shadow-black/45">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#FFFFFF]">
            🚀 Public Beta
          </p>

          <div className="mt-3 flex items-end gap-2">
            <p className="text-5xl font-black leading-none text-[#FFFFFF]">
              {safeCount}
            </p>

            <p className="pb-1 text-sm font-black uppercase tracking-wide text-[#FFFFFF]">
              Beta Testers
            </p>
          </div>
        </div>

        <div className="rounded-full bg-[#0D1626] px-4 py-2 text-xs font-black uppercase text-[#FFFFFF]">
          Goal: {goal}
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#0D1626]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0A84FF] to-[#19C6FF] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm font-bold text-[#FFFFFF]">
        <span>{percent}% complete</span>
        <span>{remaining} to goal</span>
      </div>

      <p className="mt-4 text-center text-sm font-semibold leading-relaxed text-[#FFFFFF]">
        Built for the Lake of the Ozarks
      </p>
    </div>
  );
}