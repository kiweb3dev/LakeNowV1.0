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

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export default function CaptainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [captainNeed, setCaptainNeed] = useState<
    "captain_my_boat" | "arrange_ride"
  >("captain_my_boat");
  const [isTwentyOneOrOlder, setIsTwentyOneOrOlder] = useState<
    "yes" | "no" | ""
  >("");
  const [alcoholOnBoard, setAlcoholOnBoard] = useState<"yes" | "no" | "">("");

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
      !form.boat_location.trim() ||
      !form.duration.trim() ||
      !form.notes.trim() ||
      !isTwentyOneOrOlder ||
      !alcoholOnBoard
    ) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    const captainNeedLabel =
      captainNeed === "captain_my_boat"
        ? "Captain my boat"
        : "Help arrange a ride";
    const details = [
      captainNeedLabel,
      `21 or older: ${isTwentyOneOrOlder === "yes" ? "Yes" : "No"}`,
      `Alcohol on board: ${alcoholOnBoard === "yes" ? "Yes" : "No"}`,
      form.notes,
    ].join("\n");

    const { error } = await supabase.from("requests").insert([
      {
        type: "captain_request",
        name: form.name,
        phone: form.phone,
        pickup: form.boat_location,
        destination: form.duration,
        items: details,
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
        icon={<ShipWheel size={34} strokeWidth={2.5} />}
        title="Request Captain"
        subtitle="Choose what you need, then give us the details."
      >
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-left text-xs font-black uppercase tracking-[0.16em] text-[#FFFFFF]/70">
              What do you need?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCaptainNeed("captain_my_boat")}
                className={`rounded-[18px] border px-4 py-4 text-left transition active:scale-[0.985] ${
                  captainNeed === "captain_my_boat"
                    ? "border-[#0A84FF] bg-[#0A84FF] text-[#FFFFFF]"
                    : "border-[#FFFFFF]/10 bg-[#0D1626] text-[#FFFFFF]/75"
                }`}
              >
                <span className="block text-sm font-black">
                  Captain My Boat
                </span>
                <span className="mt-1 block text-xs font-semibold opacity-75">
                  I have a boat.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCaptainNeed("arrange_ride")}
                className={`rounded-[18px] border px-4 py-4 text-left transition active:scale-[0.985] ${
                  captainNeed === "arrange_ride"
                    ? "border-[#0A84FF] bg-[#0A84FF] text-[#FFFFFF]"
                    : "border-[#FFFFFF]/10 bg-[#0D1626] text-[#FFFFFF]/75"
                }`}
              >
                <span className="block text-sm font-black">
                  Arrange a Ride
                </span>
                <span className="mt-1 block text-xs font-semibold opacity-75">
                  I need a boat.
                </span>
              </button>
            </div>
          </div>

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
            label={
              captainNeed === "captain_my_boat"
                ? "Boat Location"
                : "Pickup Location"
            }
            placeholder={
              captainNeed === "captain_my_boat"
                ? "Dock, marina, or cove"
                : "Where should we pick you up?"
            }
            required
            value={form.boat_location}
            onChange={(e) =>
              setForm({ ...form, boat_location: e.target.value })
            }
          />

          <TextInput
            label={
              captainNeed === "captain_my_boat"
                ? "Estimated Time Needed"
                : "Destination / Time"
            }
            placeholder={
              captainNeed === "captain_my_boat"
                ? "Example: 2 hours"
                : "Where are you going, and when?"
            }
            required
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />

          <div>
            <p className="mb-2 text-left text-xs font-black uppercase tracking-[0.16em] text-[#FFFFFF]/70">
              Are you 21 or older?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsTwentyOneOrOlder("yes")}
                className={`rounded-[18px] border px-4 py-4 text-center text-sm font-black transition active:scale-[0.985] ${
                  isTwentyOneOrOlder === "yes"
                    ? "border-[#0A84FF] bg-[#0A84FF] text-[#FFFFFF]"
                    : "border-[#FFFFFF]/10 bg-[#0D1626] text-[#FFFFFF]/75"
                }`}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() => setIsTwentyOneOrOlder("no")}
                className={`rounded-[18px] border px-4 py-4 text-center text-sm font-black transition active:scale-[0.985] ${
                  isTwentyOneOrOlder === "no"
                    ? "border-[#0A84FF] bg-[#0A84FF] text-[#FFFFFF]"
                    : "border-[#FFFFFF]/10 bg-[#0D1626] text-[#FFFFFF]/75"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <p className="mb-2 text-left text-xs font-black uppercase tracking-[0.16em] text-[#FFFFFF]/70">
              Will alcohol be on board?
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAlcoholOnBoard("yes")}
                className={`rounded-[18px] border px-4 py-4 text-center text-sm font-black transition active:scale-[0.985] ${
                  alcoholOnBoard === "yes"
                    ? "border-[#0A84FF] bg-[#0A84FF] text-[#FFFFFF]"
                    : "border-[#FFFFFF]/10 bg-[#0D1626] text-[#FFFFFF]/75"
                }`}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() => setAlcoholOnBoard("no")}
                className={`rounded-[18px] border px-4 py-4 text-center text-sm font-black transition active:scale-[0.985] ${
                  alcoholOnBoard === "no"
                    ? "border-[#0A84FF] bg-[#0A84FF] text-[#FFFFFF]"
                    : "border-[#FFFFFF]/10 bg-[#0D1626] text-[#FFFFFF]/75"
                }`}
              >
                No
              </button>
            </div>
          </div>

          <TextArea
            label="Additional Details"
            placeholder={
              captainNeed === "captain_my_boat"
                ? "Anything your captain should know?"
                : "Group size, dock details, timing, or special requests"
            }
            rows={4}
            required
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <PrimaryButton onClick={submitRequest} disabled={loading}>
            {loading ? "Sending..." : "Request Captain"}
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
