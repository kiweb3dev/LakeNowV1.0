"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BoatDeliveryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    items: "",
  });

  async function submitRequest() {
    // Basic validation (launch-safe, not over-engineered)
    if (
      !form.phone.trim() ||
      !form.pickup.trim() ||
      !form.destination.trim() ||
      !form.items.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("requests").insert([
      {
        type: "boat_delivery",
        name: form.name,
        phone: form.phone,
        pickup: form.pickup,
        destination: form.destination,
        items: form.items,
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

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center">
          📦 Boat Delivery
        </h1>

        <p className="text-center text-white/70 mt-3 mb-8">
          Forgot something on the water? We’ll bring it right to your dock.
        </p>

        {/* FORM */}
        <div className="space-y-4">

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Your Name (optional)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Pickup Location (Marina / Store) *"
            value={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.value })}
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="Drop-off Dock / Location *"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <textarea
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            rows={4}
            placeholder="What do you need delivered? (ice, drinks, food, etc.) *"
            value={form.items}
            onChange={(e) =>
              setForm({ ...form, items: e.target.value })
            }
          />

        </div>

        {/* SUBMIT */}
        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-blue-600 py-4 text-lg font-bold hover:bg-blue-500 transition disabled:opacity-50"
        >
          {loading ? "Sending Request..." : "Request Boat Delivery"}
        </button>

        {/* BACK */}
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