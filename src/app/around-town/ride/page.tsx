"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";

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
      !form.name.trim() ||
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
    <PageContainer>
      <Logo size={64} />

      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold">🚗 Request a Ride</h2>
        <p className="mt-3 text-white/60">
          Heading to dinner, your hotel, or home for the night? We’ll get you there.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <TextInput
          label="Name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <TextInput
          label="Phone Number"
          placeholder="Best number to reach you"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <TextInput
          label="Pickup Location"
          placeholder="Where should we pick you up?"
          value={form.pickup}
          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
        />

        <TextInput
          label="Destination"
          placeholder="Where are you headed?"
          value={form.destination}
          onChange={(e) =>
            setForm({ ...form, destination: e.target.value })
          }
        />
      </div>

      <div className="mt-8 space-y-4">
        <PrimaryButton onClick={submitRequest} disabled={loading}>
          {loading ? "Sending Request..." : "Request Ride"}
        </PrimaryButton>

        <button
          onClick={() => router.back()}
          className="w-full rounded-3xl border border-white/15 py-4 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          Back
        </button>
      </div>
    </PageContainer>
  );
}