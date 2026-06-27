"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function AroundTownPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Logo size={64} />

      <PageHeader
        title="Car Rides & Delivery"
        subtitle="Need a ride across town or something delivered? We’ll take care of it."
      />

      <div className="mt-8 flex-1 space-y-4">
        <ServiceCard
          icon="🚗"
          title="Request a Ride"
          description="Heading out, heading home, or meeting friends? We’ll get you there."
          onClick={() => router.push("/around-town/ride")}
        />

        <ServiceCard
          icon="📦"
          title="Request Delivery"
          description="Food, drinks, ice, groceries, or forgotten supplies — we’ll bring them to you."
          onClick={() => router.push("/around-town/delivery")}
        />
      </div>

      <button
        onClick={() => router.back()}
        className="pb-4 text-center text-white/50 transition hover:text-white"
      >
        ← Back
      </button>
    </PageContainer>
  );
}