"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WaterTaxi() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    passengers: "1",
    notes: "",
  });

  const update = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const submit = async () => {
  if (!form.phone || !form.pickup) {
    alert("Please enter pickup and phone");
    return;
  };

  const { error } = await supabase.from("requests").insert([
    {
      name: form.name,
      phone: form.phone,
      pickup: form.pickup,
      destination: form.destination,
      passengers: form.passengers,
      notes: form.notes,

      type: "water_taxi",
      created_at: new Date().toISOString(),
    }
  ]);

  if (error) {
    console.log(error);
    alert("Error submitting request");
    return;
  }

  alert("🚤 Request sent! We’re finding your captain now.");

  setForm({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    passengers: "1",
    notes: "",
  });

    if (error) {
      console.log(error);
      alert("Error submitting request");
      return;
    }

    alert("🚤 Request sent! We’re finding your captain now.");

    setForm({
      name: "",
      phone: "",
      pickup: "",
      destination: "",
      passengers: "1",
      notes: "",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-3xl font-bold">🚤 Water Taxi</h1>
      <p className="text-white/70 mt-1">
        Dock-to-dock transportation on the lake
      </p>

      <div className="mt-6 space-y-3 max-w-md">

        <input
          name="pickup"
          placeholder="Pickup location (dock / cove)"
          onChange={update}
          value={form.pickup}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <input
          name="destination"
          placeholder="Where are you going?"
          onChange={update}
          value={form.destination}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <input
          name="passengers"
          placeholder="Passengers"
          onChange={update}
          value={form.passengers}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <input
          name="phone"
          placeholder="Phone number"
          onChange={update}
          value={form.phone}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          onChange={update}
          value={form.notes}
          className="w-full p-3 rounded-xl bg-white text-black placeholder-gray-500"
        />

        <button
          onClick={submit}
          className="w-full bg-teal-600 text-white p-4 rounded-xl font-bold hover:bg-teal-500 transition"
        >
          Request Water Taxi
        </button>

      </div>
    </main>
  );
}