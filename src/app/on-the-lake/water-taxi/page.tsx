"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";

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
        type: "water_taxi",
        name: form.name,
        phone: form.phone,
        pickup: form.pickup,
        destination: form.destination,
        items: form.passengers
          ? `${form.passengers} passenger(s)`
          : "Passenger count not provided",
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
      <Logo size={58} />

      <PageHeader
        title="Water Taxi"
        subtitle="Skip the driving. We’ll get you and your crew safely from dock to dock."
      />

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
          label="Pickup Dock"
          placeholder="Where should we meet you?"
          value={form.pickup}
          onChange={(e) => setForm({ ...form, pickup: e.target.value })}
        />

        <TextInput
          label="Destination Dock"
          placeholder="Where are you headed?"
          value={form.destination}
          onChange={(e) =>
            setForm({ ...form, destination: e.target.value })
          }
        />

        <TextInput
          label="Passengers"
          placeholder="How many people?"
          value={form.passengers}
          onChange={(e) =>
            setForm({ ...form, passengers: e.target.value })
          }
        />
      </div>

      <div className="mt-8 space-y-4">
        <PrimaryButton onClick={submitRequest} disabled={loading}>
          {loading ? "Sending Request..." : "Send Request"}
        </PrimaryButton>

        <button
          onClick={() => router.back()}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-4 text-white/60 transition hover:bg-white/[0.1] hover:text-white"
        >
          Back
        </button>
      </div>
    </PageContainer>
  );
}