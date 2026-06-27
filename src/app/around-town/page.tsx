"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";

export default function AroundTownPage() {
  const router = useRouter();

  return (
    <PageContainer>

      {/* Logo */}
      <Logo size={70} />

      {/* Header */}
      <div className="mt-10 text-center">

        <h2 className="text-3xl font-bold">
          🚗 Car Rides & Delivery
        </h2>

        <p className="mt-3 text-white/60">
          Fast transportation and local deliveries around Lake of the Ozarks.
        </p>

      </div>

      {/* Services */}
      <div className="mt-10 flex-1 space-y-5">

        <PrimaryButton
          onClick={() => router.push("/around-town/ride")}
        >
          🚗 Request a Ride
        </PrimaryButton>

        <PrimaryButton
          onClick={() => router.push("/around-town/delivery")}
          className="bg-white/10 border border-white/20 hover:bg-white/20"
        >
          📦 Request Delivery
        </PrimaryButton>

      </div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="pb-4 text-center text-white/50 hover:text-white transition"
      >
        ← Back
      </button>

    </PageContainer>
  );
}