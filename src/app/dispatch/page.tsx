"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  type: string | null;
  phone: string;
  location?: string;
  pickup?: string;
  destination?: string;
  notes?: string;
  created_at: string;
  status?: string | null;
  assigned_to?: string | null;
};

const PRICE_MAP: Record<string, number> = {
  water_taxi: 75,
  boat_delivery: 25,
  captain_request: 150,
};

export default function DispatchMobile() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [filter, setFilter] = useState("all");

  const playSound = () => {
    const audio = new Audio("/alert.mp3");
    audio.play().catch(() => {});
  };

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    setRequests(data || []);
  };

  useEffect(() => {
    fetchRequests();

    const channel = supabase
      .channel("mobile-ops")
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
    await supabase.from("requests").update({ status }).eq("id", id);

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const assign = async (id: string) => {
    const name = prompt("Assign to:");
    if (!name) return;

    await supabase.from("requests").update({ assigned_to: name }).eq("id", id);

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, assigned_to: name } : r))
    );
  };

  const getPrice = (type: string | null) => {
    if (!type) return 0;
    return PRICE_MAP[type] || 0;
  };

  const filtered = requests.filter((r) => {
    if (filter === "all") return true;
    return r.type === filter;
  });

  const totalRevenue = requests.reduce((sum, r) => {
    if (r.status !== "accepted" && r.status !== "done") return sum;
    return sum + getPrice(r.type);
  }, 0);

  return (
    <main className="min-h-screen bg-black text-white p-3">

      {/* HEADER (MOBILE SAFE) */}
      <div className="sticky top-0 bg-black py-2 z-10 border-b border-white/10">
        <h1 className="text-xl font-bold">📱 LakeNow Ops</h1>

        <div className="text-green-400 font-bold text-sm">
          💰 ${totalRevenue} earned
        </div>
      </div>

      {/* FILTER ROW (BIG TOUCH BUTTONS) */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {[
          { key: "all", label: "ALL" },
          { key: "water_taxi", label: "🚤 RIDE" },
          { key: "boat_delivery", label: "📦 DROP" },
          { key: "captain_request", label: "🛥 CAPT" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`py-3 rounded-xl text-sm font-bold ${
              filter === f.key
                ? "bg-white text-black"
                : "bg-white/10 text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="mt-4 space-y-3">

        {filtered.length === 0 && (
          <div className="text-white/50 text-sm">No jobs</div>
        )}

        {filtered.map((req) => {
          const price = getPrice(req.type);
          const status = req.status || "new";

          return (
            <div
              key={req.id}
              className={`p-3 rounded-xl border ${
                status === "new"
                  ? "border-yellow-400/40 bg-yellow-500/10"
                  : status === "accepted"
                  ? "border-blue-400/40 bg-blue-500/10"
                  : "border-green-400/40 bg-green-500/10"
              }`}
            >

              {/* TOP */}
              <div className="flex justify-between items-center">
                <div className="font-bold text-sm">
                  {(req.type || "unknown").replaceAll("_", " ")}
                </div>

                <div className="text-green-400 font-bold text-sm">
                  ${price}
                </div>
              </div>

              {/* DETAILS */}
              <div className="text-xs text-white/70 mt-2 space-y-1">
                <div>📞 {req.phone}</div>
                {req.location && <div>📍 {req.location}</div>}
                {req.pickup && <div>🚤 {req.pickup}</div>}
                {req.destination && <div>🎯 {req.destination}</div>}
                {req.assigned_to && (
                  <div className="text-purple-300">
                    👤 {req.assigned_to}
                  </div>
                )}
              </div>

              {/* ACTIONS (BIG MOBILE BUTTONS) */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                <button
                  onClick={() => updateStatus(req.id, "accepted")}
                  className="py-3 bg-blue-600 rounded-lg text-xs font-bold"
                >
                  ACCEPT
                </button>

                <button
                  onClick={() => updateStatus(req.id, "done")}
                  className="py-3 bg-green-600 rounded-lg text-xs font-bold"
                >
                  DONE
                </button>

                <button
                  onClick={() => assign(req.id)}
                  className="py-3 bg-purple-600 rounded-lg text-xs font-bold"
                >
                  ASSIGN
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </main>
  );
}