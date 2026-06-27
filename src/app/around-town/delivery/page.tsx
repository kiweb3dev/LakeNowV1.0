"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeliveryPage() {
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
        type: "delivery",
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
    <main className="min-h-screen bg-black text-white p-6 flex justify-center">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-center">
          📦 Request a Delivery
        </h1>

        <p className="text-center text-white/70 mt-3 mb-8">
          Need ice, drinks, food, bait, or supplies?
          We'll bring them to you.
        </p>

        <div className="space-y-4">

          <input
            placeholder="Your Name (optional)"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
          />

          <input
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
          />

          <input
            placeholder="Pickup Location (Store/Restaurant) *"
            value={form.pickup}
            onChange={(e) =>
              setForm({ ...form, pickup: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
          />

          <input
            placeholder="Deliver To *"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
          />

          <textarea
            placeholder="What do you need delivered? *"
            rows={4}
            value={form.items}
            onChange={(e) =>
              setForm({ ...form, items: e.target.value })
            }
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
          />

        </div>

        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-green-600 py-4 text-lg font-bold hover:bg-green-500 transition disabled:opacity-50"
        >
          {loading ? "Sending Request..." : "Request a Delivery"}
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