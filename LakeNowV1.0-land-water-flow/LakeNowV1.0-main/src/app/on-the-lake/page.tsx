"use client";

import { useRouter } from "next/navigation";
import { Anchor, Package, ShipWheel } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function OnTheLakePage() {
  const router = useRouter();

  return (
    <PageContainer activeTab="water" showNav>
      <div className="flex flex-1 flex-col justify-center">
        <PageHeader
          title="Water"
          subtitle="Choose a ride, delivery, or captain."
        />

        <div className="mt-10 space-y-4">
          <ServiceCard
            icon={<Anchor size={34} strokeWidth={2.5} />}
            title="Request Ride"
            description="Get a ride across the water."
            onClick={() => router.push("/on-the-lake/water-taxi")}
          />

          <ServiceCard
            icon={<Package size={34} strokeWidth={2.5} />}
            title="Request Delivery"
            description="We'll deliver to your dock."
            onClick={() => router.push("/on-the-lake/boat-delivery")}
          />

          <ServiceCard
            icon={<ShipWheel size={34} strokeWidth={2.5} />}
            title="Request Captain"
            description="Captain my boat or help arrange a ride."
            onClick={() => router.push("/on-the-lake/captain")}
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
