"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ShipWheel } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import FormShell from "@/components/FormShell";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import TextArea from "@/components/TextArea";

export default function CaptainPage() {
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
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.boat_location.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("requests").insert([
      {
        type: "captain_request",
        name: form.name,
        phone: form.phone,
        pickup: form.boat_location,
        destination: form.duration || null,
        items: form.notes || null,
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
        icon={<ShipWheel size={46} strokeWidth={2.5} />}
        title="Captain My Boat"
        subtitle="Relax, enjoy the lake, and let one of our licensed captains take the helm."
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
            label="Boat Location"
            placeholder="Dock, marina, or cove"
            value={form.boat_location}
            onChange={(e) =>
              setForm({ ...form, boat_location: e.target.value })
            }
          />

          <TextInput
            label="Estimated Time Needed"
            placeholder="Example: 2 hours"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />

          <TextArea
            label="Additional Details"
            placeholder="Anything your captain should know?"
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
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