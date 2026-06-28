"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";

export default function RequestReceivedPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#0A84FF] to-[#19C6FF] text-[#FFFFFF] shadow-2xl shadow-[#0A84FF]/40">
              <CheckCircle size={54} strokeWidth={2.5} />
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-[#FFFFFF]">
              Request
              <br />
              Received!
            </h1>

            <p className="mt-5 text-lg font-semibold leading-relaxed text-[#FFFFFF]">
              Your request is on its way to our dispatch team.
            </p>

            <p className="mt-3 text-base font-semibold leading-relaxed text-[#FFFFFF]">
              We’ll contact you shortly to confirm the details.
            </p>

            <div className="mt-9 w-full">
              <PrimaryButton onClick={() => router.push("/")}>
                Return Home
              </PrimaryButton>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}