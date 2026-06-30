"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Anchor } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import FormShell from "@/components/FormShell";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

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
      !form.destination.trim() ||
      !form.passengers.trim()
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
        items: `${form.passengers} passenger(s)`,
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
    <PageContainer showBeta={false}>
      <FormShell
        icon={<Anchor size={34} strokeWidth={2.5} />}
        title="Water Ride"
        subtitle="Tell us where to pick you up and where to go."
      >
        <div className="space-y-4">
          <TextInput
            label="Name"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextInput
            label="Phone Number"
            placeholder="Best number to reach you"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: digitsOnly(e.target.value) })
            }
          />

          <TextInput
            label="Pickup Dock"
            placeholder="Where should we meet you?"
            required
            value={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.value })}
          />

          <TextInput
            label="Destination Dock"
            placeholder="Where are you headed?"
            required
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          <TextInput
            label="Passengers"
            placeholder="How many people?"
            inputMode="numeric"
            pattern="[0-9]*"
            required
            value={form.passengers}
            onChange={(e) =>
              setForm({ ...form, passengers: digitsOnly(e.target.value) })
            }
          />

          <PrimaryButton onClick={submitRequest} disabled={loading}>
            {loading ? "Sending..." : "Request Ride"}
          </PrimaryButton>

          <p className="text-center text-xs font-semibold leading-relaxed text-[#FFFFFF]/55">
            Your information is safe and secure.
          </p>

          <button
            onClick={() => router.back()}
            className="w-full rounded-full border border-[#FFFFFF]/10 bg-transparent py-4 text-base font-black text-[#FFFFFF]/80 transition active:scale-[0.985]"
          >
            Back
          </button>
        </div>
      </FormShell>
    </PageContainer>
  );
}
