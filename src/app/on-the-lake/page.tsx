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
      <div className="flex flex-1 flex-col pt-8">
        <PageHeader
          title="Water"
          subtitle="Choose a ride, delivery, or captain."
        />

        <div className="mt-8 space-y-3">
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
      </div>
    </PageContainer>
  );
}
