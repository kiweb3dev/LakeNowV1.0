"use client";

export default function BetaBanner() {
  return (
    <div className="mb-5 flex items-center justify-between rounded-full border border-[#FFFFFF]/10 bg-[#071426]/90 px-4 py-3 shadow-lg shadow-black/20">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#19C6FF]">
          LakeNow Beta
        </p>
        <p className="mt-0.5 text-xs font-semibold text-[#FFFFFF]/75">
          Early access is open.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-[#0D1626] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#19C6FF]" />
        <span className="text-[11px] font-black uppercase text-[#FFFFFF]">
          Live
        </span>
      </div>
    </div>
  );
}
