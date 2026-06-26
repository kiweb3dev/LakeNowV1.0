"use client";

import { useRouter } from "next/navigation";
import LocationCard from "@/components/cards/LocationCard";

export default function OnTheLake() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900">
        On the Lake
      </h1>

      <p className="text-sm text-slate-500 mt-1 mb-6">
        Water transport, deliveries, and boat assistance
      </p>

      <LocationCard
        icon="🚤"
        title="Water Taxi"
        subtitle="Dock-to-dock passenger transport"
        onClick={() => router.push("/on-the-lake/water-taxi")}
      />

      <LocationCard
        icon="📦"
        title="Boat Delivery"
        subtitle="Supplies delivered to your boat"
        onClick={() => router.push("/on-the-lake/boat-delivery")}
      />

      <LocationCard
        icon="🧑‍✈️"
        title="Captain My Boat"
        subtitle="We safely operate your boat for you"
        onClick={() => router.push("/on-the-lake/captain")}
      />
    </main>
  );
}