"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";

export default function OnTheLakePage() {
  const router = useRouter();

  return (
    <PageContainer>

      {/* Logo */}

      <Logo size={70} />

      {/* Header */}

      <div className="mt-10 text-center">

        <h2 className="text-3xl font-bold">
          🚤 On The Lake
        </h2>

        <p className="mt-3 text-white/60">
          Water transportation and boating services at Lake of the Ozarks.
        </p>

      </div>

      {/* Services */}

      <div className="mt-10 flex-1 space-y-5">

        <PrimaryButton
          onClick={() => router.push("/on-the-lake/water-taxi")}
        >
          🚤 Water Taxi
        </PrimaryButton>

        <PrimaryButton
          onClick={() => router.push("/on-the-lake/boat-delivery")}
          className="bg-white/10 border border-white/20 hover:bg-white/20"
        >
          📦 Boat Delivery
        </PrimaryButton>

        <PrimaryButton
          onClick={() => router.push("/on-the-lake/captain")}
          className="bg-white/10 border border-white/20 hover:bg-white/20"
        >
          🛥 Captain My Boat
        </PrimaryButton>

      </div>

      {/* Back */}

      <button
        onClick={() => router.back()}
        className="pb-4 text-center text-white/50 transition hover:text-white"
      >
        ← Back
      </button>

    </PageContainer>
  );
}