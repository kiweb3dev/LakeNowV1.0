"use client";

import { useRouter } from "next/navigation";
import { Car, Waves } from "lucide-react";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <Logo size={95} />

        <div className="mt-12 text-center">
          <h1 className="text-5xl font-black leading-tight tracking-tight text-white">
            Need something
            <br />
            <span className="text-white">at the lake?</span>
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-lg leading-relaxed text-white">
            Getting you where you need to go —
            <br />
            by road or by water.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <ServiceCard
            icon={<Car size={34} strokeWidth={2.5} />}
            title="Car Rides & Delivery"
            description="Get there or get it there. We’ve got you."
            onClick={() => router.push("/around-town")}
          />

          <ServiceCard
            icon={<Waves size={34} strokeWidth={2.5} />}
            title="On The Lake"
            description="Water taxi, boat delivery, and captain services."
            onClick={() => router.push("/on-the-lake")}
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white">Serving Lake of the Ozarks</p>
          <p className="mt-2 text-sm font-semibold tracking-wide text-blue-400">
            Fast • Local • Reliable
          </p>
        </div>
      </div>
    </PageContainer>
  );
}