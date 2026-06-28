"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Star } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";
import { supabase } from "@/lib/supabase";

export default function RequestReceivedPage() {
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function submitRating(value: number) {
    setRating(value);

    const { error } = await supabase.from("beta_feedback").insert([
      {
        rating: value,
      },
    ]);

    if (!error) {
      setSubmitted(true);
    }
  }

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

            <div className="mt-8 w-full rounded-[24px] border border-[#FFFFFF]/20 bg-[#0D1626] p-5">
              <p className="text-lg font-black text-[#FFFFFF]">
                How likely are you to use LakeNow again?
              </p>

              <div className="mt-4 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => submitRating(value)}
                    className="text-[#FFFFFF] transition active:scale-[0.9]"
                  >
                    <Star
                      size={34}
                      strokeWidth={2.5}
                      fill={
                        rating && value <= rating
                          ? "#19C6FF"
                          : "transparent"
                      }
                    />
                  </button>
                ))}
              </div>

              {submitted && (
                <p className="mt-4 text-sm font-bold text-[#FFFFFF]">
                  Thanks — your feedback helps build LakeNow.
                </p>
              )}
            </div>

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