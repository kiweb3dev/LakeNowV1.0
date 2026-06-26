"use client";

import { useRouter } from "next/navigation";
import Hero from "@/components/layout/Hero";
import PageHeader from "@/components/layout/PageHeader";
import LocationCard from "@/components/cards/LocationCard";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50">
      <PageHeader />

      <Hero />

      <div className="px-6 pb-10 max-w-md mx-auto">
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">
          Where are you now?
        </p>

        <LocationCard
          icon="🏙️"
          title="Around Town"
          subtitle="Rides • Deliveries"
          onClick={() => router.push("/around-town")}
        />

        <LocationCard
          icon="🚤"
          title="On the Lake"
          subtitle="Water Taxi • Deliveries • Captain"
          onClick={() => router.push("/on-the-lake")}
        />
      </div>
    </main>
  );
}