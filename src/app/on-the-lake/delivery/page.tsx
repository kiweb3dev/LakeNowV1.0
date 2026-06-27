"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BoatDelivery() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    items: "",
    notes: "",
  });

  const update = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (!form.phone || !form.location || !form.items) {
      alert("Please fill in location, items, and phone");
      return;
    }

    const { error } = await supabase.from("requests").insert([
      {
        name: form.name,
        phone: form.phone,
        location: form.location,
        items: form.items,
        notes: form.notes,

        type: "boat_delivery",
        created_at: new Date().toISOString(),
      },
    ]);

if (error) {
  console.log("SUPABASE ERROR FULL:", error);
  alert(error.message);
  return;
}

    alert("📦 Delivery request sent! We’re on the way.");

    setForm({
      name: "",
      phone: "",
      location: "",
      items: "",
      notes: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-3xl font-bold">📦 Boat Delivery</h1>
      <p className="text-white/60 mt-1">
        Food, ice, drinks & supplies delivered to your boat
      </p>

      <div className="mt-6 space-y-3 max-w-md">

        <input
          name="location"
          placeholder="Your location (dock / cove)"
          value={form.location}
          onChange={update}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <input
          name="items"
          placeholder="What do you need? (ice, food, drinks...)"
          value={form.items}
          onChange={update}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <input
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={update}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <input
          name="name"
          placeholder="Name (optional)"
          value={form.name}
          onChange={update}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <textarea
          name="notes"
          placeholder="Extra notes (optional)"
          value={form.notes}
          onChange={update}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <button
          onClick={submit}
          className="w-full bg-orange-600 text-white p-4 rounded-xl font-bold hover:bg-orange-500 transition"
        >
          Request Delivery
        </button>

      </div>
    </main>
  );
}