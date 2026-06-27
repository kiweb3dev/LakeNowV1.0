"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
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
        destination: form.duration,
        items: form.notes,
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

        <h2 className="text-3xl font-bold">
          🛥 Captain My Boat
        </h2>

        <p className="mt-3 text-white/60">
          Enjoy the lake while one of our captains handles the driving.
        </p>

      </div>

      <div className="mt-8 space-y-5">

        <TextInput
          label="Name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <TextInput
          label="Phone Number"
          placeholder="Best number to reach you"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <TextInput
          label="Boat Location"
          placeholder="Dock, marina, or cove"
          value={form.boat_location}
          onChange={(e) =>
            setForm({
              ...form,
              boat_location: e.target.value,
            })
          }
        />

        <TextInput
          label="Estimated Time Needed (optional)"
          placeholder="Example: 4 hours"
          value={form.duration}
          onChange={(e) =>
            setForm({
              ...form,
              duration: e.target.value,
            })
          }
        />

        <TextArea
          label="Additional Details (optional)"
          placeholder="Tell us anything that will help your captain."
          rows={4}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
        />

      </div>

      <div className="mt-8 space-y-4">

        <PrimaryButton
          onClick={submitRequest}
          disabled={loading}
        >
          {loading ? "Sending Request..." : "Request Captain"}
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