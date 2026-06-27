"use client";

import { useRouter } from "next/navigation";

export default function OnTheLake() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mt-6 text-center">
        🚤 On The Lake
      </h1>

      <p className="text-white/60 text-sm text-center mt-2 max-w-md">
        Water-based transportation services across Lake of the Ozarks.
      </p>

      {/* OPTIONS */}
      <div className="w-full max-w-sm mt-10 space-y-4">

        {/* WATER TAXI */}
        <button
          onClick={() => router.push("/on-the-lake/water-taxi")}
          className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg"
        >
          🚤 Water Taxi
          <div className="text-xs font-normal mt-1 text-white/80">
            Dock-to-dock passenger rides
          </div>
        </button>

        {/* BOAT DELIVERY */}
        <button
          onClick={() => router.push("/on-the-lake/boat-delivery")}
          className="w-full py-5 rounded-2xl bg-green-600 text-white font-bold text-lg"
        >
          📦 Boat Delivery
          <div className="text-xs font-normal mt-1 text-white/80">
            We deliver items by boat
          </div>
        </button>

        {/* CAPTAIN SERVICE */}
        <button
          onClick={() => router.push("/on-the-lake/captain")}
          className="w-full py-5 rounded-2xl bg-purple-600 text-white font-bold text-lg"
        >
          🛥 Captain My Boat
          <div className="text-xs font-normal mt-1 text-white/80">
            We operate your boat for you
          </div>
        </button>

      </div>

      {/* BACK */}
      <button
        onClick={() => router.push("/")}
        className="mt-10 text-white/40 text-sm"
      >
        ← Back to Home
      </button>

    </main>
  );
}