"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        🚤 LakeNow
      </h1>

      <p className="text-white/60 text-center mt-2 text-sm max-w-md">
        Fast rides, deliveries, and boat service around Lake of the Ozarks.
      </p>

      {/* MAIN CHOICE */}
      <div className="w-full max-w-sm mt-10 space-y-4">

        {/* AROUND TOWN */}
        <button
          onClick={() => router.push("/around-town")}
          className="w-full py-5 rounded-2xl bg-white text-black font-bold text-lg"
        >
          🚗 Around Town
          <div className="text-xs font-normal mt-1">
            Rides & Deliveries
          </div>
        </button>

        {/* ON THE LAKE */}
        <button
          onClick={() => router.push("/on-the-lake")}
          className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg"
        >
          🚤 On The Lake
          <div className="text-xs font-normal mt-1 text-white/80">
            Water Taxi • Boat Delivery • Captain Service
          </div>
        </button>

      </div>

      {/* FOOTER */}
      <p className="text-white/30 text-xs mt-10 text-center">
        Lake of the Ozarks • On-demand local transport
      </p>

    </main>
  );
}