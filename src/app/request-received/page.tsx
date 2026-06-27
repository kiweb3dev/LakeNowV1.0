"use client";

import { useRouter } from "next/navigation";

export default function RequestReceivedPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md text-center">

        <div className="text-7xl mb-6">
          ✅
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Request Received!
        </h1>

        <p className="text-white/70 leading-7">
          Your request has been sent to our
          <span className="font-bold text-white"> Dispatch Center</span>.
        </p>

        <p className="text-white/70 mt-4">
          A member of our team will contact you shortly using the phone number you provided.
        </p>

        <div className="mt-8 rounded-2xl border border-green-500/40 bg-green-500/10 p-4">

          <p className="font-semibold text-green-300">
            📱 Please keep your phone nearby.
          </p>

        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-10 rounded-xl bg-blue-600 py-4 text-lg font-bold hover:bg-blue-500 transition"
        >
          Return Home
        </button>

      </div>

    </main>
  );
}