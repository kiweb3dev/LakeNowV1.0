"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

import PrimaryButton from "@/components/PrimaryButton";
import TextArea from "@/components/TextArea";
import { supabase } from "@/lib/supabase";

export default function FeedbackForm() {
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
    <div className="text-left">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A84FF] text-[#FFFFFF]">
          <MessageCircle size={23} strokeWidth={2.5} />
        </div>

        <div>
          <p className="font-black text-[#FFFFFF]">
            Quick feedback
          </p>
          <p className="text-sm font-semibold text-[#FFFFFF]/70">
            What should LakeNow offer or improve?
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
            placeholder="Tell us what you would improve or what feature you want LakeNow to offer."
            rows={4}
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <PrimaryButton onClick={submitFeedback} disabled={feedbackLoading}>
            {feedbackLoading ? "Sending..." : "Send Feedback"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
