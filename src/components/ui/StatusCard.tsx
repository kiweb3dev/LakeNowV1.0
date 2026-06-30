"use client";

export default function StatusCard() {
  return (
    <div className="mb-6 rounded-full border border-[#FFFFFF]/20 bg-[#071426] px-5 py-3 text-[#FFFFFF] shadow-xl shadow-black/30">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FFFFFF]">
            Live Status
          </p>
          <p className="mt-1 text-sm font-bold text-[#FFFFFF]">
            Dispatch Online
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-[#0D1626] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#19C6FF]" />
          <span className="text-xs font-black uppercase text-[#FFFFFF]">
            Live
          </span>
        </div>
      </div>
    </div>
  );
}