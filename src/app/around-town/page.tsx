"use client";

import { useRouter } from "next/navigation";

export default function AroundTown() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mt-6 text-center">
        🚗 Around Town
      </h1>

      <p className="text-white/60 text-sm text-center mt-2 max-w-md">
        Fast local rides and deliveries around Lake of the Ozarks area.
      </p>

      {/* OPTIONS */}
      <div className="w-full max-w-sm mt-10 space-y-4">

        {/* RIDE */}
        <button
          onClick={() => router.push("/around-town/ride")}
          className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg"
        >
          🚗 Get a Ride
          <div className="text-xs font-normal mt-1">
            From A → B anywhere nearby
          </div>
        </button>

        {/* DELIVERY */}
        <button
          onClick={() => router.push("/around-town/delivery")}
          className="w-full py-5 rounded-2xl bg-green-600 text-white font-bold text-lg"
        >
          📦 Delivery
          <div className="text-xs font-normal mt-1 text-white/80">
            We pick up & deliver items for you
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