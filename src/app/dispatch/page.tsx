"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Car,
  Package,
  Anchor,
  ShipWheel,
  ClipboardList,
  Phone,
  MapPin,
  Target,
  FileText,
  User,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";

type Request = {
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

function getService(type: string | null) {
  if (type === "ride") return { label: "Ride", icon: <Car size={22} /> };
  if (type === "delivery") return { label: "Land Delivery", icon: <Package size={22} /> };
  if (type === "water_taxi") return { label: "Water Ride", icon: <Anchor size={22} /> };
  if (type === "boat_delivery") return { label: "Water Delivery", icon: <Package size={22} /> };
  if (type === "captain_request") return { label: "Captain Request", icon: <ShipWheel size={22} /> };
  if (type === "beta_feedback") return { label: "Beta Feedback", icon: <FileText size={22} /> };
  return { label: "Request", icon: <ClipboardList size={22} /> };
}

function formatCentralTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(new Date(value));
}

function getMapUrl(value: string | null) {
  if (!value) return null;

  const match = value.match(/https:\/\/www\.google\.com\/maps\?q=[^\s)]+/);
  return match?.[0] || null;
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  const mapUrl = getMapUrl(value);

  return (
    <div className="rounded-[18px] border border-[#FFFFFF]/8 bg-[#020407]/45 p-3">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0 text-[#19C6FF]">{icon}</div>

        <div className="min-w-0 flex-1 text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#FFFFFF]/45">
            {label}
          </p>
          <p className="mt-1 break-words text-sm font-semibold leading-relaxed text-[#FFFFFF]">
            {value}
          </p>
        </div>
      </div>

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#19C6FF]/25 bg-[#0A84FF]/15 px-3 py-2 text-xs font-black text-[#D9F4FF]"
        >
          Open Map <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}

export default function DispatchPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  async function fetchRequests() {
    const response = await fetch("/api/dispatch-requests", {
      cache: "no-store",
    });

    if (response.status === 401) {
      window.location.href = "/dispatch/login";
      return;
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      alert(body?.error || "Unable to load dispatch requests.");
      return;
    }

    setRequests(body?.requests || []);
  }

  async function updateStatus(id: string, status: string) {
    const response = await fetch(`/api/dispatch-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      alert(body?.error || "Unable to update request status.");
      return;
    }

    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  }

  async function logout() {
    await fetch("/api/dispatch-logout", { method: "POST" });
    window.location.href = "/dispatch/login";
  }

  useEffect(() => {
    fetchRequests();

    const interval = window.setInterval(fetchRequests, 15000);

    const channel = supabase
      .channel("dispatch-center")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests" },
        () => fetchRequests()
      )
      .subscribe();

    return () => {
      window.clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <PageContainer>
      <div className="flex items-center justify-center">
        <Logo size={92} />
      </div>

      <PageHeader
        title="Dispatch Center"
        subtitle="Live LakeNow requests, ready to accept and complete."
      />

      <button
        onClick={logout}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#FFFFFF]/15 bg-[#050B14]/80 px-4 py-3 text-sm font-black text-[#FFFFFF]/75 transition active:scale-[0.985]"
      >
        <LogOut size={17} />
        Sign Out
      </button>

      <div className="mt-6 space-y-4">
        {requests.length === 0 && (
          <Card>
            <p className="text-center text-white">No requests yet.</p>
          </Card>
        )}

        {requests.map((request) => {
          const status = request.status || "pending";
          const service = getService(request.type);

          return (
            <Card key={request.id}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#19C6FF]/35 bg-[#0A84FF]/20 text-[#D9F4FF]">
                  {service.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-xl font-black leading-tight text-white">
                    {service.label}
                  </h3>

                  <p className="mt-1 break-words text-xs font-semibold leading-relaxed text-white/60">
                    {formatCentralTime(request.created_at)}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${
                    status === "rejected"
                      ? "bg-red-600 text-white"
                      : status === "done"
                      ? "bg-green-600 text-white"
                      : status === "accepted"
                      ? "bg-yellow-400 text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-5 space-y-3 rounded-[22px] border border-[#FFFFFF]/8 bg-black/25 p-3 text-sm text-white">
                <DetailRow
                  icon={<User size={16} />}
                  label="Name"
                  value={request.name || "No name"}
                />

                <DetailRow
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={request.phone || "No phone"}
                />

                {request.pickup && (
                  <DetailRow
                    icon={<MapPin size={16} />}
                    label="Pickup"
                    value={request.pickup}
                  />
                )}

                {request.destination && (
                  <DetailRow
                    icon={<Target size={16} />}
                    label="Destination"
                    value={request.destination}
                  />
                )}

                {request.items && (
                  <DetailRow
                    icon={<FileText size={16} />}
                    label="Details"
                    value={request.items}
                  />
                )}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <button
                  onClick={() => updateStatus(request.id, "accepted")}
                  className="rounded-2xl bg-yellow-400 py-4 text-sm font-black text-black shadow-lg shadow-yellow-500/20 transition active:scale-[0.97] hover:bg-yellow-300"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(request.id, "done")}
                  className="rounded-2xl bg-green-600 py-4 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-green-500"
                >
                  Done
                </button>

                <button
                  onClick={() => updateStatus(request.id, "rejected")}
                  className="rounded-2xl bg-red-600 py-4 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-red-500"
                >
                  Reject
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
