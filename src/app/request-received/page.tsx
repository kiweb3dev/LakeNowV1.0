"use client";

import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";

export default function RequestReceivedPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col justify-center">
        <Logo size={68} />

        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-5xl font-bold shadow-lg shadow-green-950/40">
              ✓
            </div>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight">
              Request Received!
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Your request is on its way to our dispatch team.
            </p>

            <p className="mt-3 text-white/50">
              We’ll contact you shortly to confirm the details.
            </p>

            <div className="mt-8 w-full">
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