"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";

export default function RequestReceivedPage() {
  const router = useRouter();

  return (
    <PageContainer showBeta={false}>
      <div className="flex flex-1 flex-col justify-center">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#45C85A] text-[#FFFFFF] shadow-xl shadow-[#45C85A]/20">
              <Check size={58} strokeWidth={3} />
            </div>

            <h1 className="mt-8 text-[38px] font-black leading-tight tracking-tight text-[#FFFFFF]">
              You're all set.
            </h1>

            <p className="mt-4 max-w-xs text-base font-semibold leading-relaxed text-[#FFFFFF]/75">
              We received your request and will contact you shortly.
            </p>

            <div className="mt-8 w-full rounded-[22px] border border-[#FFFFFF]/10 bg-[#0D1626] p-4 text-left">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFFFFF]/55">
                Next step
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#FFFFFF]/75">
                Keep your phone nearby. A local LakeNow team member will confirm the details.
              </p>
            </div>

            <div className="mt-7 w-full">
              <PrimaryButton onClick={() => router.push("/")}>
                Back to Home
              </PrimaryButton>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
