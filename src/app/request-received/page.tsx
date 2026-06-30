"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import Card from "@/components/Card";
import TextArea from "@/components/TextArea";
import { supabase } from "@/lib/supabase";

export default function RequestReceivedPage() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  async function submitFeedback() {
    if (!feedback.trim()) {
      alert("Please enter your feedback first.");
      return;
    }

    setFeedbackLoading(true);

    const { error } = await supabase.from("requests").insert([
      {
        type: "beta_feedback",
        name: "Beta feedback",
        phone: "",
        pickup: "Feedback",
        destination: "Feedback",
        items: feedback,
        status: "submitted",
        created_at: new Date().toISOString(),
      },
    ]);

    setFeedbackLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setFeedback("");
    setFeedbackSent(true);
  }

  return (
    <PageContainer showBeta={false}>
      <div className="flex flex-1 flex-col space-y-4 pt-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#45C85A] text-[#FFFFFF] shadow-xl shadow-[#45C85A]/20">
              <Check size={50} strokeWidth={3} />
            </div>

            <h1 className="mt-6 text-[36px] font-black leading-tight tracking-tight text-[#FFFFFF]">
              You're all set.
            </h1>

            <p className="mt-4 max-w-xs text-base font-semibold leading-relaxed text-[#FFFFFF]/75">
              We received your request and will contact you shortly.
            </p>

            <div className="mt-6 w-full rounded-[22px] border border-[#FFFFFF]/10 bg-[#0D1626] p-4 text-left">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FFFFFF]/55">
                Next step
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#FFFFFF]/75">
                Keep your phone nearby. A local LakeNow team member will confirm the details.
              </p>
            </div>

            <div className="mt-6 w-full">
              <PrimaryButton onClick={() => router.push("/")}>
                Back to Home
              </PrimaryButton>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A84FF] text-[#FFFFFF]">
                <MessageCircle size={23} strokeWidth={2.5} />
              </div>

              <div>
                <p className="font-black text-[#FFFFFF]">
                  Quick feedback
                </p>
                <p className="text-sm font-semibold text-[#FFFFFF]/60">
                  What should LakeNow offer next?
                </p>
              </div>
            </div>

            {feedbackSent ? (
              <p className="mt-5 rounded-[18px] bg-[#0D1626] p-4 text-sm font-semibold leading-relaxed text-[#FFFFFF]/75">
                Thank you. This helps us build the right lake service.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                <TextArea
                  label="Recommendation"
                  placeholder="Anything you would recommend or want LakeNow to offer?"
                  rows={4}
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />

                <PrimaryButton
                  onClick={submitFeedback}
                  disabled={feedbackLoading}
                >
                  {feedbackLoading ? "Sending..." : "Send Feedback"}
                </PrimaryButton>
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
