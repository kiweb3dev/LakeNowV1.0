"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RideRequest = {
  id: string;
  name: string;
  phone: string;
  pickup: string;
  destination: string;
  passengers: string;
  notes: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [rides, setRides] = useState<RideRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = async () => {
    const { data, error } = await supabase
      .from("ride_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRides(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRides();

    const interval = setInterval(() => {
      fetchRides();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from("ride_requests")
      .update({ status })
      .eq("id", id);

    fetchRides();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "#FDE68A"; // yellow
      case "accepted":
        return "#BFDBFE"; // blue
      case "en_route":
        return "#C7D2FE"; // indigo
      case "arrived":
        return "#A7F3D0"; // green
      case "completed":
        return "#D1D5DB"; // gray
      default:
        return "#F3F4F6";
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>
        🚤 LakeNow Dispatch Center
      </h1>

      <p style={{ marginBottom: 20, color: "#666" }}>
        Live ride requests across Lake of the Ozarks
      </p>

      {loading && <p>Loading requests...</p>}

      {!loading && rides.length === 0 && (
        <p>No ride requests yet.</p>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {rides.map((ride) => (
          <div
            key={ride.id}
            style={{
              background: getStatusColor(ride.status),
              padding: 15,
              borderRadius: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0 }}>{ride.name}</h2>
              <span style={{ fontWeight: "bold" }}>
                {ride.status.toUpperCase()}
              </span>
            </div>

            {/* DETAILS */}
            <p>📞 {ride.phone}</p>
            <p>📍 Pickup: {ride.pickup}</p>
            <p>🎯 Destination: {ride.destination}</p>
            <p>👥 Passengers: {ride.passengers}</p>
            {ride.notes && <p>📝 {ride.notes}</p>}

            <p style={{ fontSize: 12, color: "#555" }}>
              🕒 {new Date(ride.created_at).toLocaleString()}
            </p>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={() => updateStatus(ride.id, "accepted")}>
                Accept
              </button>

              <button onClick={() => updateStatus(ride.id, "en_route")}>
                En Route
              </button>

              <button onClick={() => updateStatus(ride.id, "arrived")}>
                Arrived
              </button>

              <button onClick={() => updateStatus(ride.id, "completed")}>
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}