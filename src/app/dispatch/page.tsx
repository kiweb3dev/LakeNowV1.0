"use client";

import { useEffect, useState } from "react";
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

function getServiceLabel(type: string | null) {
  if (type === "ride") return "🚗 Ride";
  if (type === "delivery") return "📦 Car Delivery";
  if (type === "water_taxi") return "🚤 Water Taxi";
  if (type === "boat_delivery") return "📦 Boat Delivery";
  if (type === "captain_request") return "🛥 Captain My Boat";
  return "Request";
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
            <p className="text-center text-white/60">No requests yet.</p>
          </Card>
        )}

        {requests.map((request) => {
          const status = request.status || "pending";

          return (
            <Card key={request.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold">
                    {getServiceLabel(request.type)}
                  </h3>

                  <p className="mt-1 text-xs text-white/45">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                    status === "done"
                      ? "bg-green-600 text-white"
                      : status === "accepted"
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-5 space-y-2 rounded-2xl bg-black/25 p-4 text-sm">
                <p className="text-white">
                  👤 <span className="font-semibold">Name:</span>{" "}
                  {request.name || "No name"}
                </p>

                <p className="text-white">
                  📞 <span className="font-semibold">Phone:</span>{" "}
                  {request.phone || "No phone"}
                </p>

                {request.pickup && (
                  <p className="text-white/80">
                    📍 <span className="font-semibold">Pickup:</span>{" "}
                    {request.pickup}
                  </p>
                )}

                {request.destination && (
                  <p className="text-white/80">
                    🎯 <span className="font-semibold">Destination:</span>{" "}
                    {request.destination}
                  </p>
                )}

                {request.items && (
                  <p className="text-white/80">
                    📝 <span className="font-semibold">Details:</span>{" "}
                    {request.items}
                  </p>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={() => updateStatus(request.id, "accepted")}
                  className="rounded-2xl bg-blue-600 py-4 font-bold text-white transition active:scale-[0.98] hover:bg-blue-500"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(request.id, "done")}
                  className="rounded-2xl bg-green-600 py-4 font-bold text-white transition active:scale-[0.98] hover:bg-green-500"
                >
                  Done
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}