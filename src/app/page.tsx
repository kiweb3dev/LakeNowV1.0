"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HERO */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <div className="text-6xl mb-4">🚤</div>

        <h1 className="text-6xl font-black tracking-tight">
          LakeNow
        </h1>

        <p className="mt-3 text-lg text-white/80">
          Transportation. Delivered.
        </p>

        <p className="mt-4 text-sm text-white/50 max-w-md">
          Ride • Deliver • Captain
        </p>

        <div className="mt-10 text-xl font-semibold">
          Where are you now?
        </div>

        <p className="mt-2 text-sm text-white/50">
          Choose your starting point
        </p>

        {/* BUTTONS */}
        <div className="mt-8 w-full max-w-md space-y-4">

          <button
            onClick={() => router.push("/around-town")}
            className="w-full rounded-3xl bg-blue-600/90 p-6 text-left hover:bg-blue-500 transition shadow-lg"
          >
            <div className="text-2xl font-bold">🚗 Around Town</div>
            <div className="text-sm text-white/80 mt-1">
              Rides & Deliveries in Town
            </div>
          </button>

          <button
            onClick={() => router.push("/on-the-lake")}
            className="w-full rounded-3xl bg-teal-600/90 p-6 text-left hover:bg-teal-500 transition shadow-lg"
          >
            <div className="text-2xl font-bold">🌊 On the Lake</div>
            <div className="text-sm text-white/80 mt-1">
              Water Taxi • Boat Delivery • Captain Service
            </div>
          </button>

        </div>
      </div>

      {/* TRUST */}
      <div className="mt-10 border-t border-white/10 py-6 text-center text-xs text-white/50">
        ✓ Local Operators • ✓ Real-Time Dispatch • ✓ Lake of the Ozarks
      </div>

    </main>
  );
}