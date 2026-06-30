"use client";

import { Heart, MessageCircle, ShieldCheck } from "lucide-react";

import PageContainer from "@/components/PageContainer";
import Card from "@/components/Card";

export default function ProfilePage() {
  return (
    <PageContainer activeTab="profile" showNav>
      <div className="flex flex-1 flex-col justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25">
            <Heart size={34} strokeWidth={2.5} />
          </div>

          <h1 className="mt-6 text-[34px] font-black leading-none tracking-tight text-[#FFFFFF]">
            Built for the Lake.
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
            LakeNow is in public beta for Lake of the Ozarks.
          </p>
        </div>

        <div className="mt-8 space-y-4">
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
                  Public beta
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
                  Every request helps us improve before the full launch.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
