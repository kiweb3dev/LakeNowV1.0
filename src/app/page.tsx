"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  const router = useRouter();

  return (
    <PageContainer>

      {/* Center Content */}
      <div className="flex flex-1 flex-col items-center justify-center">

        <Logo size={90} />

        <p className="mt-10 text-center text-lg text-white/70">
          Need a ride or delivery?
        </p>

        <div className="mt-10 w-full space-y-5">

          <PrimaryButton
            onClick={() => router.push("/around-town")}
            className="bg-white/10 border border-white/20 hover:bg-white/20"
          >
            🚗 Rides & Delivery
          </PrimaryButton>

          <PrimaryButton
            onClick={() => router.push("/on-the-lake")}
          >
            🚤 On The Lake
          </PrimaryButton>

        </div>

      </div>

      {/* Footer */}

      <div className="pb-4">

        <p className="text-center text-sm text-white/40">
          Serving Lake of the Ozarks
        </p>

      </div>

    </PageContainer>
  );
}