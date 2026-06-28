"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";

export default function OnTheLakePage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Logo size={64} />

      <PageHeader
        title="On The Lake"
        subtitle="Everything you need while you're enjoying Lake of the Ozarks."
      />

      <div className="mt-8 flex-1 space-y-4">
        <ServiceCard
          icon="🚤"
          title="Water Taxi"
          description="Skip the driving. We'll get you and your crew safely from dock to dock."
          onClick={() => router.push("/on-the-lake/water-taxi")}
        />

        <ServiceCard
          icon="📦"
          title="Boat Delivery"
          description="Need something brought to your dock? We'll deliver it right to the water."
          onClick={() => router.push("/on-the-lake/boat-delivery")}
        />

        <ServiceCard
          icon="🧑‍✈️"
          title="Captain My Boat"
          description="Relax, enjoy the lake, and let one of our licensed captains take the helm."
          onClick={() => router.push("/on-the-lake/captain")}
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