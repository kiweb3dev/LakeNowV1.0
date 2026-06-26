"use client";

import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DispatchPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setRequests(data);
    setLoading(false);
  };

useEffect(() => {
  fetchRequests();

  const channel: RealtimeChannel = supabase
    .channel("requests-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "requests",
      },
      (payload) => {
        console.log("REALTIME UPDATE:", payload);
        fetchRequests();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("requests").update({ status }).eq("id", id);
    fetchRequests();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        padding: 20,
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
          🚤 LakeNow Dispatch Center
        </h1>
        <p style={{ color: "#94a3b8" }}>
          Live operational control system
        </p>
      </div>

      {/* STATUS */}
      {loading && <p style={{ color: "#94a3b8" }}>Loading requests...</p>}

      {!loading && requests.length === 0 && (
        <div
          style={{
            padding: 20,
            background: "#111827",
            borderRadius: 12,
            color: "#94a3b8",
          }}
        >
          No active requests
        </div>
      )}

      {/* CARDS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {requests.map((req) => (
          <div
            key={req.id}
            style={{
              background: "#111827",
              border: "1px solid #1f2937",
              borderRadius: 12,
              padding: 16,
            }}
          >
            {/* TOP ROW */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: "bold", fontSize: 16 }}>
                  {req.customer_name}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>
                  {req.phone}
                </div>
              </div>

              <span
                style={{
                  fontSize: 12,
                  padding: "4px 8px",
                  borderRadius: 6,
                  background: "#1f2937",
                  color: "#93c5fd",
                }}
              >
                {req.status}
              </span>
            </div>

            {/* DETAILS */}
            <div style={{ marginTop: 10, fontSize: 13, color: "#cbd5e1" }}>
              <p>📍 Pickup: {req.pickup}</p>
              <p>🎯 Destination: {req.destination}</p>
              <p>🚦 Service: {req.service_type}</p>
              <p>🚤 Mode: {req.transport_mode}</p>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={() => updateStatus(req.id, "assigned")}
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(req.id, "en_route")}
                style={{
                  background: "#f59e0b",
                  color: "black",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                En Route
              </button>

              <button
                onClick={() => updateStatus(req.id, "completed")}
                style={{
                  background: "#10b981",
                  color: "black",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}