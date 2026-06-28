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
        <div className="text-left">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#FFFFFF]">
            LAKENOW
          </p>

          <h1 className="mt-5 text-6xl font-black leading-[0.92] tracking-tight text-[#FFFFFF]">
            Ready to
            <br />
            get moving?
          </h1>

          <p className="mt-6 max-w-sm text-xl font-semibold leading-relaxed text-[#FFFFFF]">
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
            <div className="flex items-center gap-4 text-[#FFFFFF]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A84FF] text-[#FFFFFF]">
                <CircleCheck size={24} strokeWidth={2.5} />
              </div>

              <div>
                <p className="text-lg font-black text-[#FFFFFF]">
                  Available Today
                </p>
                <p className="text-base font-semibold text-[#FFFFFF]">
                  Dispatching at Lake of the Ozarks
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}