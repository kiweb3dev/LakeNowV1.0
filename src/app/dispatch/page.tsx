"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto min-h-screen w-full max-w-md px-6 py-8">

        <div className="text-center">
          <h1 className="text-4xl font-extrabold">LakeNow</h1>
          <p className="mt-1 text-sm uppercase tracking-[0.25em] text-white/50">
            Dispatch Center
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5">
          <h2 className="text-2xl font-bold">Live Requests</h2>
          <p className="mt-1 text-white/60">
            Accept and complete customer requests here.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {requests.length === 0 && (
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center text-white/60">
              No requests yet.
            </div>
          )}

          {requests.map((request) => {
            const status = request.status || "pending";

            return (
              <div
                key={request.id}
                className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {getServiceLabel(request.type)}
                    </h3>

                    <p className="mt-1 text-xs text-white/50">
                      {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase text-white">
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
                    className="rounded-2xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-500"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(request.id, "done")}
                    className="rounded-2xl bg-green-600 py-4 font-bold text-white transition hover:bg-green-500"
                  >
                    Done
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}