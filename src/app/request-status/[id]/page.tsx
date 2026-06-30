"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  Clock,
  Home,
  MapPin,
  Phone,
  RefreshCw,
  XCircle,
} from "lucide-react";

import Card from "@/components/Card";
import FeedbackForm from "@/components/FeedbackForm";
import PageContainer from "@/components/PageContainer";
import PrimaryButton from "@/components/PrimaryButton";
import { supabase } from "@/lib/supabase";

type RequestRecord = {
  id: string;
  type: string | null;
  name: string | null;
  phone: string | null;
  pickup: string | null;
  destination: string | null;
  items: string | null;
  status: string | null;
  created_at: string;
};

const statusContent = {
  pending: {
    label: "Request received",
    message: "Dispatch is reviewing your request now.",
    color: "text-[#19C6FF]",
    bg: "bg-[#0A84FF]/20",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    message: "LakeNow accepted your request. Keep your phone nearby.",
    color: "text-[#19C6FF]",
    bg: "bg-[#0A84FF]/20",
    icon: CheckCircle,
  },
  done: {
    label: "Completed",
    message: "Your request has been marked complete. Thank you for using LakeNow.",
    color: "text-[#45C85A]",
    bg: "bg-[#45C85A]/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Unable to fulfill",
    message: "We are not able to fulfill this request right now.",
    color: "text-[#FF5A5F]",
    bg: "bg-[#FF5A5F]/20",
    icon: XCircle,
  },
};

function getServiceLabel(type: string | null) {
  if (type === "ride") return "Land Ride";
  if (type === "delivery") return "Land Delivery";
  if (type === "water_taxi") return "Water Ride";
  if (type === "boat_delivery") return "Water Delivery";
  if (type === "captain_request") return "Captain Request";
  return "LakeNow Request";
}

function getRequestId(id: string | string[] | undefined) {
  return Array.isArray(id) ? id[0] : id;
}

export default function RequestStatusPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = getRequestId(params.id);
  const [request, setRequest] = useState<RequestRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requestId) return;

    async function fetchRequest() {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("id", requestId)
        .single();

      if (!error && data) {
        setRequest(data);
      }

      setLoading(false);
    }

    fetchRequest();

    const channel = supabase
      .channel(`request-status-${requestId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "requests",
          filter: `id=eq.${requestId}`,
        },
        (payload) => {
          setRequest(payload.new as RequestRecord);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId]);

  const status = request?.status || "pending";
  const current =
    statusContent[status as keyof typeof statusContent] || statusContent.pending;
  const StatusIcon = current.icon;

  return (
    <PageContainer showBeta={false}>
      <div className="flex flex-1 flex-col space-y-4 pt-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full ${current.bg} ${current.color}`}
            >
              {loading ? (
                <RefreshCw className="animate-spin" size={42} strokeWidth={2.7} />
              ) : (
                <StatusIcon size={48} strokeWidth={2.7} />
              )}
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#19C6FF]">
              {request ? getServiceLabel(request.type) : "LakeNow Request"}
            </p>

            <h1 className="mt-2 text-[34px] font-black leading-tight tracking-tight text-[#FFFFFF]">
              {loading ? "Checking status..." : current.label}
            </h1>

            <p className="mt-3 max-w-xs text-base font-semibold leading-relaxed text-[#FFFFFF]/75">
              {loading ? "One moment while we load your request." : current.message}
            </p>

            {request && (
              <div className="mt-6 w-full space-y-3 rounded-[22px] border border-[#FFFFFF]/10 bg-[#020407]/55 p-4 text-left text-sm font-semibold text-[#FFFFFF]/75">
                {request.phone && (
                  <p className="flex gap-2">
                    <Phone className="mt-0.5 shrink-0 text-[#19C6FF]" size={16} />
                    <span>{request.phone}</span>
                  </p>
                )}

                {request.pickup && (
                  <p className="flex gap-2">
                    <MapPin className="mt-0.5 shrink-0 text-[#19C6FF]" size={16} />
                    <span>{request.pickup}</span>
                  </p>
                )}

                {request.destination && (
                  <p className="flex gap-2">
                    <MapPin className="mt-0.5 shrink-0 text-[#19C6FF]" size={16} />
                    <span>{request.destination}</span>
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 w-full">
              <PrimaryButton onClick={() => router.push("/")}>
                <span className="inline-flex items-center justify-center gap-2">
                  <Home size={18} strokeWidth={2.6} />
                  Back to Home
                </span>
              </PrimaryButton>
            </div>
          </div>
        </Card>

        <Card>
          <FeedbackForm />
        </Card>
      </div>
    </PageContainer>
  );
}
