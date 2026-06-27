"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  type: string | null;
  phone: string;
  name?: string;
  location?: string;
  pickup?: string;
  destination?: string;
  items?: string;
  duration?: string;
  notes?: string;
  created_at: string;
  status?: string | null;
  assigned_to?: string | null;
};

export default function Dispatch() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [filter, setFilter] = useState("all");

  // 🔊 ALERT SOUND
  const playSound = () => {
    const audio = new Audio("/alert.mp3");
    audio.play().catch(() => {});
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("FETCH ERROR:", error);
      return;
    }

    setRequests(data || []);
  };

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel("realtime-requests")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "requests" },
        (payload) => {
          playSound();
          setRequests((prev) => [payload.new as Request, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.log("STATUS ERROR:", error);
      return;
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const assignJob = async (id: string) => {
    const name = prompt("Assign to (driver name):");
    if (!name) return;

    const { error } = await supabase
      .from("requests")
      .update({ assigned_to: name })
      .eq("id", id);

    if (error) {
      console.log("ASSIGN ERROR:", error);
      return;
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, assigned_to: name } : r))
    );
  };

  const filtered = requests.filter((r) => {
    if (filter === "all") return true;
    return r.type === filter;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">📡 Dispatch Center</h1>

      <div className="mt-2 text-sm text-white/60">
        🚤 Rides: {requests.filter(r => r.type === "water_taxi").length} •{" "}
        📦 Deliveries: {requests.filter(r => r.type === "boat_delivery").length} •{" "}
        🛥 Captains: {requests.filter(r => r.type === "captain_request").length}
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {[
          { key: "all", label: "All" },
          { key: "water_taxi", label: "🚤 Ride" },
          { key: "boat_delivery", label: "📦 Delivery" },
          { key: "captain_request", label: "🛥 Captain" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f.key
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-4">

        {filtered.length === 0 && (
          <p className="text-white/50">No requests yet.</p>
        )}

        {filtered.map((req) => {
          const status = req.status || "new";
          const type = (req.type || "unknown").replaceAll("_", " ");

          return (
            <div
              key={req.id}
              className={`border rounded-xl p-4 transition ${
                status === "new"
                  ? "bg-yellow-500/10 border-yellow-400/30"
                  : status === "accepted"
                  ? "bg-blue-500/10 border-blue-400/30"
                  : "bg-green-500/10 border-green-400/30"
              }`}
            >

              {/* TOP */}
              <div className="flex justify-between items-center">
                <div className="font-bold capitalize">{type}</div>

                <div className="text-xs text-white/50">
                  {new Date(req.created_at).toLocaleTimeString()}
                </div>
              </div>

              {/* STATUS */}
              <div className="mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                  {status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="mt-3 text-sm space-y-1 text-white/80">
                <div>📞 {req.phone}</div>
                {req.location && <div>📍 {req.location}</div>}
                {req.pickup && <div>🚤 Pickup: {req.pickup}</div>}
                {req.destination && <div>🎯 Dropoff: {req.destination}</div>}
                {req.items && <div>📦 Items: {req.items}</div>}
                {req.duration && <div>⏱ Duration: {req.duration}</div>}
                {req.notes && <div>📝 {req.notes}</div>}
                {req.assigned_to && (
                  <div className="text-purple-300">
                    👤 Assigned: {req.assigned_to}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(req.id, "accepted")}
                  className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(req.id, "done")}
                  className="px-3 py-1 bg-green-600 rounded text-sm"
                >
                  Done
                </button>

                <button
                  onClick={() => assignJob(req.id)}
                  className="px-3 py-1 bg-purple-600 rounded text-sm"
                >
                  Assign
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </main>
  );
}