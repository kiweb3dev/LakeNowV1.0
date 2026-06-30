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
      <div className="flex flex-1 flex-col pt-8">
        <PageHeader
          title="Land"
          subtitle="Choose a ride or delivery."
        />

        <div className="mt-8 space-y-3">
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
      </div>
    </PageContainer>
  );
}
