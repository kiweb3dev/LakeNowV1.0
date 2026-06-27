"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function WaterTaxiPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    passengers: "",
  });

  async function submitRequest() {
    if (!form.name.trim()) {
  alert("Please enter your name.");
  return;
}
    if (
  !form.name.trim() ||
  !form.phone.trim() ||
  !form.pickup?.trim()
) {
  alert("Please complete required fields.");
  return;
}

    setLoading(true);

    const { error } = await supabase.from("requests").insert([
      {
        type: "water_taxi",
        name: form.name,
        phone: form.phone,
        pickup: form.pickup,
        destination: form.destination,
        passengers: form.passengers,
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
    <main className="min-h-screen bg-black text-white flex justify-center p-6">
      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          🚤 Request a Water Taxi
        </h1>

        <p className="text-center text-white/70 mt-3 mb-8">
          Need a ride across the lake? We'll pick you up and get you where you need to go.
        </p>

        <div className="space-y-4">

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Your Name (optional)"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Pickup Dock / Marina *"
            value={form.pickup}
            onChange={(e) =>
              setForm({ ...form, pickup: e.target.value })
            }
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Destination Dock / Marina *"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Number of Passengers"
            value={form.passengers}
            onChange={(e) =>
              setForm({ ...form, passengers: e.target.value })
            }
          />

        </div>

        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-blue-600 py-4 text-lg font-bold hover:bg-blue-500 transition disabled:opacity-50"
        >
          {loading ? "Sending Request..." : "Request a Water Taxi"}
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