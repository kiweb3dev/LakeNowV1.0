"use client";

import { useRouter } from "next/navigation";

export default function OnTheLake() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HEADER */}
      <div className="px-6 pt-10 pb-6 text-center">
        <div className="text-5xl mb-3">🌊</div>

        <h1 className="text-4xl font-black">
          On the Lake
        </h1>

        <p className="mt-2 text-white/60">
          Water transportation & lake services
        </p>
      </div>

      {/* CORE QUESTION */}
      <div className="px-6 text-center">
        <h2 className="text-xl font-semibold">
          What do you need?
        </h2>
        <p className="text-sm text-white/50 mt-1">
          Fast dispatch. Lake of the Ozarks.
        </p>
      </div>

      {/* OPTIONS */}
      <div className="px-6 mt-8 space-y-4 max-w-md mx-auto w-full">

        {/* WATER TAXI */}
        <button
          onClick={() => router.push("/on-the-lake/water-taxi")}
          className="w-full rounded-3xl bg-teal-600/90 p-6 text-left hover:bg-teal-500 transition shadow-lg"
        >
          <div className="text-2xl font-bold">🚤 Water Taxi</div>
          <div className="text-sm text-white/80 mt-1">
            Dock-to-dock transportation
          </div>
        </button>

        {/* BOAT DELIVERY */}
        <button
          onClick={() => router.push("/on-the-lake/delivery")}
          className="w-full rounded-3xl bg-orange-600/90 p-6 text-left hover:bg-orange-500 transition shadow-lg"
        >
          <div className="text-2xl font-bold">📦 Boat Delivery</div>
          <div className="text-sm text-white/80 mt-1">
            Food, ice, drinks & supplies to your boat
          </div>
        </button>

        {/* CAPTAIN MY BOAT */}
        <button
          onClick={() => router.push("/on-the-lake/captain")}
          className="w-full rounded-3xl bg-green-600/90 p-6 text-left hover:bg-green-500 transition shadow-lg"
        >
          <div className="text-2xl font-bold">🛥 Captain My Boat</div>
          <div className="text-sm text-white/80 mt-1">
            We operate your boat safely for you
          </div>
        </button>

      </div>

      {/* TRUST BAR */}
      <div className="mt-auto border-t border-white/10 py-6 text-center text-xs text-white/50">
        ✓ Licensed Operators • ✓ Real-Time Dispatch • ✓ Lake of the Ozarks
      </div>

    </main>
  );
}