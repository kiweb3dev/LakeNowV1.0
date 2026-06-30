"use client";

import { Heart, MessageCircle, ShieldCheck } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import Card from "@/components/Card";
import FeedbackForm from "@/components/FeedbackForm";

export default function ProfilePage() {
  return (
    <PageContainer activeTab="profile" showNav>
      <div className="flex flex-1 flex-col pt-8">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
            <Heart size={34} strokeWidth={2.5} />
          </div>

          <h1 className="mt-5 text-[38px] font-black leading-none tracking-tight text-[#FFFFFF]">
            Built for the Lake.
          </h1>

          <p className="mt-3 max-w-xs text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
            LakeNow is opening early access for Lake of the Ozarks.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Card>
            <div className="flex gap-4">
              <ShieldCheck
                className="mt-0.5 shrink-0 text-[#19C6FF]"
                size={24}
                strokeWidth={2.5}
              />
              <div>
                <p className="font-black text-[#FFFFFF]">
                  Local and focused
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
                  Rides, delivery, and on-water services for Lake of the Ozarks.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex gap-4">
              <MessageCircle
                className="mt-0.5 shrink-0 text-[#19C6FF]"
                size={24}
                strokeWidth={2.5}
              />
              <div>
                <p className="font-black text-[#FFFFFF]">
                  Early access
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
                  Every request and recommendation helps us shape LakeNow before wider service availability.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <FeedbackForm />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
