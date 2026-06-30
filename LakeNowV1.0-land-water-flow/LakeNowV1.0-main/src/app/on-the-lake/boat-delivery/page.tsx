"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Package } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import FormShell from "@/components/FormShell";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import TextArea from "@/components/TextArea";

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
    if (
      !form.name.trim() ||
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
    <PageContainer showBeta={false}>
      <FormShell
        icon={<Package size={34} strokeWidth={2.5} />}
        title="Water Delivery"
        subtitle="Tell us what to pick up and where to bring it."
      >
        <div className="space-y-4">
          <TextInput label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <TextInput label="Phone Number" placeholder="Best number to reach you" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <TextInput label="Pickup Location" placeholder="Marina, store, restaurant, or dock" value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} />

          <TextInput label="Delivery Dock / Location" placeholder="Where should we bring it?" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />

          <TextArea label="What do you need delivered?" placeholder="Ice, drinks, food, supplies, etc." rows={4} value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} />

          <PrimaryButton onClick={submitRequest} disabled={loading}>
            {loading ? "Sending..." : "Request Delivery"}
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
