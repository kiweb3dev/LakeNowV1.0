"use client";

import { useRouter } from "next/navigation";
import { Car, Package } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function AroundTownPage() {
  const router = useRouter();

  return (
    <PageContainer activeTab="land" showNav>
      <div className="flex flex-1 flex-col justify-center">
        <PageHeader
          title="Land"
          subtitle="Choose a ride or delivery."
        />

        <div className="mt-10 space-y-4">
          <ServiceCard
            icon={<Car size={34} strokeWidth={2.5} />}
            title="Request Ride"
            description="Get a ride anywhere around town."
            onClick={() => router.push("/around-town/ride")}
          />

          <ServiceCard
            icon={<Package size={34} strokeWidth={2.5} />}
            title="Request Delivery"
            description="Have something delivered to you."
            onClick={() => router.push("/around-town/delivery")}
          />
        </div>

        <button
          onClick={() => router.back()}
          className="mt-6 w-full rounded-full border border-[#FFFFFF]/10 bg-[#071426] py-4 text-base font-black text-[#FFFFFF] transition active:scale-[0.985]"
        >
          Back
        </button>
      </div>
    </PageContainer>
  );
}
