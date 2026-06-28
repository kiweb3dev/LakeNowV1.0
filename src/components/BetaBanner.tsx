"use client";

export default function BetaBanner() {
  return (
    <div className="mb-5 rounded-2xl border border-[#19C6FF]/40 bg-[#071426] px-4 py-3 text-center shadow-lg shadow-black/30">
      <p className="text-sm font-black text-[#FFFFFF]">
        Public Beta
      </p>
      <p className="mt-1 text-xs font-semibold leading-relaxed text-[#FFFFFF]">
        Your feedback is helping build LakeNow — the future of transportation at Lake of the Ozarks.
      </p>
    </div>
  );
}