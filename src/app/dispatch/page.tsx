"use client";

import { useEffect, useState } from "react";
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

export default function DispatchPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  async function fetchRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setRequests(data || []);
  }

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  }

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel("dispatch-center")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests" },
        () => fetchRequests()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <PageContainer>
      <Logo size={56} />

      <PageHeader
        title="Dispatch Center"
        subtitle="Live LakeNow requests, ready to accept and complete."
      />

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
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400 bg-blue-600/30 text-blue-200">
                  {service.icon}
                </div>

                <h3 className="mt-3 text-xl font-extrabold text-white">
                  {service.label}
                </h3>

                <p className="mt-1 text-xs font-semibold text-white/70">
                  {formatCentralTime(request.created_at)}
                </p>

                <span
                  className={`mt-3 rounded-full px-3 py-1 text-xs font-bold uppercase ${
                    status === "rejected"
                      ? "bg-red-600 text-white"
                      : status === "done"
                      ? "bg-green-600 text-white"
                      : status === "accepted"
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl bg-black/25 p-4 text-sm text-white">
                <p className="flex items-center justify-center gap-2">
                  <User size={16} /> <span className="font-semibold">Name:</span>{" "}
                  {request.name || "No name"}
                </p>

                <p className="flex items-center justify-center gap-2">
                  <Phone size={16} /> <span className="font-semibold">Phone:</span>{" "}
                  {request.phone || "No phone"}
                </p>

                {request.pickup && (
                  <p className="flex items-center justify-center gap-2">
                    <MapPin size={16} /> <span className="font-semibold">Pickup:</span>{" "}
                    {request.pickup}
                  </p>
                )}

                {request.destination && (
                  <p className="flex items-center justify-center gap-2">
                    <Target size={16} /> <span className="font-semibold">Destination:</span>{" "}
                    {request.destination}
                  </p>
                )}

                {request.items && (
                  <p className="flex items-center justify-center gap-2">
                    <FileText size={16} /> <span className="font-semibold">Details:</span>{" "}
                    {request.items}
                  </p>
                )}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <button
                  onClick={() => updateStatus(request.id, "accepted")}
                  className="rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-blue-500"
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
