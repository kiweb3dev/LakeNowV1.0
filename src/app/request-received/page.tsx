"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";

export default function RequestReceivedPage() {
  const router = useRouter();

  return (
    <PageContainer>

      <div className="flex flex-1 flex-col items-center justify-center text-center">

        <Logo size={72} />

        <div className="mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-5xl shadow-lg">
          ✓
        </div>

        <h1 className="mt-8 text-4xl font-bold">
          Request Received!
        </h1>

        <p className="mt-5 max-w-sm text-lg text-white/70">
          Thanks! Your request has been sent to our dispatch team.
        </p>

        <p className="mt-3 max-w-sm text-white/50">
          We'll review your request and contact you as soon as possible.
        </p>

        <div className="mt-12 w-full">
          <PrimaryButton
            onClick={() => router.push("/")}
          >
            Return Home
          </PrimaryButton>
        </div>

      </div>

    </PageContainer>
  );
}