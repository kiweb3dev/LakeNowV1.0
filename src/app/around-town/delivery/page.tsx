"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Package } from "lucide-react";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import TextArea from "@/components/TextArea";

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
    if (!form.name.trim() || !form.phone.trim() || !form.pickup.trim() || !form.destination.trim() || !form.items.trim()) {
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
    <PageContainer>
      <Logo size={58} />

      <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400 bg-blue-600/30 text-blue-200 shadow-md shadow-blue-950/50">
        <Package size={34} strokeWidth={2.5} />
      </div>

      <PageHeader
        title="Request Delivery"
        subtitle="Food, drinks, ice, groceries, or forgotten supplies — we’ll bring them to you."
      />

      <div className="mt-8 space-y-5">
        <TextInput label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextInput label="Phone Number" placeholder="Best number to reach you" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <TextInput label="Pickup Location" placeholder="Store, restaurant, marina, or pickup spot" value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} />
        <TextInput label="Delivery Location" placeholder="Where should we bring it?" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
        <TextArea label="What do you need delivered?" placeholder="Ice, drinks, food, groceries, supplies, etc." rows={4} value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} />
      </div>

      <div className="mt-8 space-y-4">
        <PrimaryButton onClick={submitRequest} disabled={loading}>
          {loading ? "Sending Request..." : "Send Request"}
        </PrimaryButton>

        <button onClick={() => router.back()} className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-4 text-white transition hover:bg-white/[0.1] hover:text-blue-400">
          Back
        </button>
      </div>
    </PageContainer>
  );
}