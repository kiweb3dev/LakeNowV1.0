"use client";

import { useRouter } from "next/navigation";
import { Anchor, Package, ShipWheel } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function OnTheLakePage() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <PageHeader
          title="On The Lake"
          subtitle="Everything you need while you're enjoying Lake of the Ozarks."
        />

        <div className="mt-12 space-y-6">
          <ServiceCard
            icon={<Anchor size={46} strokeWidth={2.5} />}
            title="Water Taxi"
            description="Skip the driving. We'll get you and your crew safely from dock to dock."
            onClick={() => router.push("/on-the-lake/water-taxi")}
          />

          <ServiceCard
            icon={<Package size={46} strokeWidth={2.5} />}
            title="Boat Delivery"
            description="Need something brought to your dock? We'll deliver it right to the water."
            onClick={() => router.push("/on-the-lake/boat-delivery")}
          />

          <ServiceCard
            icon={<ShipWheel size={46} strokeWidth={2.5} />}
            title="Captain My Boat"
            description="Relax, enjoy the lake, and let one of our licensed captains take the helm."
            onClick={() => router.push("/on-the-lake/captain")}
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