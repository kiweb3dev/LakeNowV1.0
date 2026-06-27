"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HERO */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <div className="text-5xl mb-4">🚤</div>

        <h1 className="text-5xl font-black tracking-tight">
          LakeNow
        </h1>

        <p className="mt-3 text-lg text-white/80">
          Transportation. Delivered.
        </p>

        <p className="mt-6 text-sm text-white/60 max-w-md">
          Around Town • On the Lake • On Your Schedule
        </p>

        {/* CORE QUESTION */}
        <div className="mt-10 text-xl font-semibold">
          Where are you now?
        </div>

        {/* OPTIONS */}
        <div className="mt-8 w-full max-w-md space-y-4">

          {/* Around Town */}
          <button
            onClick={() => router.push("/around-town")}
            className="w-full rounded-2xl bg-blue-600 p-6 text-left hover:bg-blue-500 transition"
          >
            <div className="text-2xl">🚗 Around Town</div>
            <div className="text-sm text-white/80 mt-1">
              Rides & Deliveries
            </div>
          </button>

          {/* On the Lake */}
          <button
            onClick={() => router.push("/on-the-lake")}
            className="w-full rounded-2xl bg-teal-600 p-6 text-left hover:bg-teal-500 transition"
          >
            <div className="text-2xl">🌊 On the Lake</div>
            <div className="text-sm text-white/80 mt-1">
              Water Taxi • Boat Delivery • Captain
            </div>
          </button>

        </div>
      </div>

      {/* TRUST BAR */}
      <div className="p-6 text-center text-xs text-white/50 border-t border-white/10">
        ✓ Local Operators • ✓ Fast Dispatch • ✓ Lake of the Ozarks
      </div>

    </main>
  );
}