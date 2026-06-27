"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  type: string;
  phone: string;
  name?: string;
  location?: string;
  pickup?: string;
  destination?: string;
  items?: string;
  boatType?: string;
  duration?: string;
  notes?: string;
  created_at: string;
  status?: string;
};

export default function Dispatch() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [filter, setFilter] = useState("all");

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
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
          setRequests((prev) => [payload.new as Request, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("requests").update({ status }).eq("id", id);

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const filtered = requests.filter((r) => {
    if (filter === "all") return true;
    return r.type === filter;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">📡 Dispatch Center</h1>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {["all", "water_taxi", "boat_delivery", "captain_request"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === type
                  ? "bg-white text-black"
                  : "bg-white/10 text-white"
              }`}
            >
              {type}
            </button>
          )
        )}
      </div>

      {/* LIST */}
      <div className="mt-6 space-y-4">

        {filtered.length === 0 && (
          <p className="text-white/50">No requests.</p>
        )}

        {filtered.map((req) => (
          <div
            key={req.id}
            className="bg-white/10 border border-white/10 rounded-xl p-4"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-center">
              <div className="font-bold capitalize">
  {(req.type || "unknown").replaceAll("_", " ")}
</div>

              <div className="text-xs text-white/50">
                {new Date(req.created_at).toLocaleTimeString()}
              </div>
            </div>

            {/* STATUS */}
            <div className="mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  req.status === "accepted"
                    ? "bg-blue-500/20 text-blue-300"
                    : req.status === "done"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {req.status || "new"}
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
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}