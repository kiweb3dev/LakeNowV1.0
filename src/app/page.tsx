"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <Logo size={78} />

        <div className="mt-10">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
            Need something
            <br />
            <span className="text-blue-500">at the lake?</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/65">
            Getting you where you need to go — by road or by water.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <ServiceCard
            icon="🚗"
            title="Car Rides & Delivery"
            description="Get there or get it there. We’ve got you."
            onClick={() => router.push("/around-town")}
          />

          <ServiceCard
            icon="🚤"
            title="On The Lake"
            description="Water taxi, boat delivery, and captain services."
            onClick={() => router.push("/on-the-lake")}
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-white/50">📍 Serving Lake of the Ozarks</p>
          <p className="mt-2 text-sm font-semibold tracking-wide text-blue-500">
            Fast • Local • Reliable
          </p>
        </div>
      </div>
    </PageContainer>
  );
}