"use client";

import { useRouter } from "next/navigation";
import LocationCard from "@/components/cards/LocationCard";

export default function AroundTown() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <h1 className="text-2xl font-bold text-slate-900">
        Around Town
      </h1>

      <p className="text-sm text-slate-500 mt-1 mb-6">
        Rides and local deliveries in Lake of the Ozarks
      </p>

      <LocationCard
        icon="🚗"
        title="Get a Ride"
        subtitle="Safe, fast rides anywhere around Lake of the Ozarks"
        onClick={() => router.push("/around-town/ride")}
      />

      <LocationCard
        icon="📦"
        title="Request Delivery"
        subtitle="Food, supplies, packages"
        onClick={() => router.push("/around-town/delivery")}
      />
    </main>
  );
}