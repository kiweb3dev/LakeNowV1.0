"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Car } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import FormShell from "@/components/FormShell";
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
      <FormShell
        icon={<Car size={46} strokeWidth={2.5} />}
        title="Request a Ride"
        subtitle="Whether you're heading to dinner, your dock, your hotel, or home — we'll get you there safely."
      >
        <div className="space-y-5">
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

          <PrimaryButton onClick={submitRequest} disabled={loading}>
            {loading ? "Sending Request..." : "Send Request"}
          </PrimaryButton>

          <button
            onClick={() => router.back()}
            className="w-full rounded-full border border-[#FFFFFF]/20 bg-[#071426] py-4 text-lg font-black text-[#FFFFFF] transition active:scale-[0.97]"
          >
            Back
          </button>
        </div>
      </FormShell>
    </PageContainer>
  );
}