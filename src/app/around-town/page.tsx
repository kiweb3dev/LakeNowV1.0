"use client";

import { useRouter } from "next/navigation";
import { Car, Package } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function AroundTownPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <PageHeader
          title="Car Rides & Delivery"
          subtitle="Need a ride across town or something delivered? We’ll take care of it."
        />

        <div className="mt-12 space-y-6">
          <ServiceCard
            icon={<Car size={46} strokeWidth={2.5} />}
            title="Request a Ride"
            description="Heading out, heading home, or meeting friends? We’ll get you there."
            onClick={() => router.push("/around-town/ride")}
          />

          <ServiceCard
            icon={<Package size={46} strokeWidth={2.5} />}
            title="Request Delivery"
            description="Food, drinks, ice, groceries, or forgotten supplies — we’ll bring them to you."
            onClick={() => router.push("/around-town/delivery")}
          />
        </div>

        <button
          onClick={() => router.back()}
          className="mt-10 w-full rounded-full border border-[#FFFFFF]/20 bg-[#071426] py-4 text-lg font-black text-[#FFFFFF] transition active:scale-[0.97]"
        >
          Back
        </button>
      </div>
    </PageContainer>
  );
}