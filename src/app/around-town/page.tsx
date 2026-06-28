"use client";

import { useRouter } from "next/navigation";
import { Car, Package } from "lucide-react";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function AroundTownPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Logo size={70} />

      <PageHeader
        title="Car Rides & Delivery"
        subtitle="Need a ride across town or something delivered? We’ll take care of it."
      />

      <div className="mt-8 flex-1 space-y-5">
        <ServiceCard
          icon={<Car size={34} strokeWidth={2.5} />}
          title="Request a Ride"
          description="Heading out, heading home, or meeting friends? We’ll get you there."
          onClick={() => router.push("/around-town/ride")}
        />

        <ServiceCard
          icon={<Package size={34} strokeWidth={2.5} />}
          title="Request Delivery"
          description="Food, drinks, ice, groceries, or forgotten supplies — we’ll bring them to you."
          onClick={() => router.push("/around-town/delivery")}
        />
      </div>

      <button
        onClick={() => router.back()}
        className="pb-4 text-center text-white transition hover:text-blue-400"
      >
        ← Back
      </button>
    </PageContainer>
  );
}