"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CaptainMyBoatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    boat_location: "",
    duration: "",
    notes: "",
  });

  async function submitRequest() {
    
    if (!form.name.trim()) {
  alert("Please enter your name.");
  return;
}

if (
  !form.name.trim() ||
  !form.phone.trim() ||
  !form.boat_location.trim()
) {
  alert("Please complete required fields.");
  return;
}
    // Basic validation (launch-safe)
    if (
  !form.name.trim() ||
  !form.phone.trim() ||
  !form.boat_location.trim()
) {
  alert("Please complete required fields.");
  return;
}

    setLoading(true);

    const { error } = await supabase.from("requests").insert([
  {
    type: "captain_request",
    name: form.name,
    phone: form.phone,
    pickup: form.boat_location,
    destination: null,
    items: form.notes,
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
          🛥 Captain My Boat
        </h1>

        <p className="text-center text-white/70 mt-3 mb-8">
          Relax and enjoy the lake. We’ll handle the driving.
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
            placeholder="Boat Location / Marina / Dock *"
            value={form.boat_location}
            onChange={(e) =>
              setForm({ ...form, boat_location: e.target.value })
            }
          />

          <input
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            placeholder="How long do you need a captain? (optional)"
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
          />

          <textarea
            className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-white placeholder:text-white/40"
            rows={4}
            placeholder="Anything we should know? (optional)"
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />

        </div>

        {/* SUBMIT */}
        <button
          onClick={submitRequest}
          disabled={loading}
          className="w-full mt-8 rounded-xl bg-purple-600 py-4 text-lg font-bold hover:bg-purple-500 transition disabled:opacity-50"
        >
          {loading ? "Sending Request..." : "Request a Captain"}
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