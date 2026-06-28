"use client";

import { useRouter } from "next/navigation";
import { Car, Waves, CircleCheck } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import ServiceCard from "@/components/ServiceCard";
import Card from "@/components/Card";

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#FFFFFF]">
            LAKENOW
          </p>

          <h1 className="mt-5 text-6xl font-black leading-[0.95] tracking-tight text-[#FFFFFF]">
            Ready to
            <br />
            get moving?
          </h1>

          <p className="mx-auto mt-6 max-w-sm text-lg font-semibold leading-relaxed text-[#FFFFFF]">
            Fast transportation & delivery at Lake of the Ozarks.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <ServiceCard
            icon={<Car size={46} strokeWidth={2.5} />}
            title="Car Rides & Delivery"
            description="Get there or get it there. We’ve got you."
            onClick={() => router.push("/around-town")}
          />

          <ServiceCard
            icon={<Waves size={46} strokeWidth={2.5} />}
            title="On The Lake"
            description="Water taxi, boat delivery, and captain services."
            onClick={() => router.push("/on-the-lake")}
          />
        </div>

        <div className="mt-10">
          <Card>
            <div className="flex items-center justify-center gap-3 text-[#FFFFFF]">
              <CircleCheck size={22} strokeWidth={2.5} />
              <div className="text-center">
                <p className="text-sm font-black">Available Today</p>
                <p className="text-sm font-semibold">Lake of the Ozarks</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}