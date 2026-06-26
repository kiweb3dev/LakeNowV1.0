"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    pickup: "",
    destination: "",
    passengers: "",
    notes: "",
  });

  const update = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.customer_name || !form.phone || !form.pickup) {
      alert("Missing required fields");
      return;
    }

    const { error } = await supabase.from("requests").insert([
      {
        ...form,
        service_type: "ride",
        transport_mode: "town",
        status: "new",
      },
    ]);

if (error) {
  console.log("SUPABASE ERROR:", error);
  alert(error.message);
  return;
}

    alert("Ride request sent 🚗");

    setForm({
      customer_name: "",
      phone: "",
      pickup: "",
      destination: "",
      passengers: "",
      notes: "",
    });
  };

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-xl font-bold">Ride Request</h1>

      <input name="customer_name" placeholder="Name" onChange={update} value={form.customer_name} />
      <input name="phone" placeholder="Phone" onChange={update} value={form.phone} />
      <input name="pickup" placeholder="Pickup" onChange={update} value={form.pickup} />
      <input name="destination" placeholder="Destination" onChange={update} value={form.destination} />
      <input name="passengers" placeholder="Passengers" onChange={update} value={form.passengers} />
      <textarea name="notes" placeholder="Notes" onChange={update} value={form.notes} />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Ride Request
      </button>
    </main>
  );
}