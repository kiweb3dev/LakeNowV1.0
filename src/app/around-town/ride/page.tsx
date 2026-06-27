"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RidePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
  });

  async function submitRequest() {
    if (
      !form.phone.trim() ||
      !form.pickup.trim() ||
      !form.destination.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("requests").insert([
      {
        type: "ride",
        name: form.name,
        phone: form.phone,
        pickup: form.pickup,
        destination: form.destination,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/request-received");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          🚗 Get a Ride
        </h1>

        <p className="text-center text-white/60 mt-2 mb-8">
          Need a ride around Lake of the Ozarks?
          We'll get you there.
        </p>

        <div className="space-y-4">

          <input
            placeholder="Your Name (optional)"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/40 border border-white/20"
          />

          <input
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/40 border border-white/20"
          />

          <input
            placeholder="Pickup Location *"
            value={form.pickup}
            onChange={(e) =>
              setForm({ ...form, pickup: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/40 border border-white/20"
          />

          <input
            placeholder="Destination *"
            value={form.destination}
            onChange={(e) =>
              setForm({
                ...form,
                destination: e.target.value,
              })
            }
            className="w-full rounded-xl bg-white/10 p-4 text-white placeholder:text-white/40 border border-white/20"
          />

        </div>

        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-green-600 py-4 text-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Request My Ride"}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 rounded-xl border border-white/20 py-4 text-white/70 hover:bg-white/10"
        >
          Back
        </button>

      </div>

    </main>
  );
}