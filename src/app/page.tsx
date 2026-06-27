import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Hero
        title="LakeNow"
        subtitle="Ride • Deliver • Captain"
        tagline="Around Town. On the Lake. On Your Schedule."
      />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold">
          What do you need today?
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <ServiceCard
            icon="🚗"
            title="Get a Ride"
            slogan="Your Destination. Our Driver."
            description="Safe transportation to bars, restaurants, hotels, vacation rentals, marinas, and home."
            href="/around-town/ride"
            color="blue"
            button="Request Ride"
          />

          <ServiceCard
            icon="🚤"
            title="Water Taxi"
            slogan="Your Dock. Our Boat."
            description="Fast dock-to-dock transportation across Lake of the Ozarks."
            href="/on-the-lake/water-taxi"
            color="teal"
            button="Request Water Taxi"
          />

          <ServiceCard
            icon="📦"
            title="Delivery"
            slogan="Your Order. Delivered."
            description="Food, drinks, groceries, ice, and supplies delivered around town or directly to your dock."
            href="/delivery"
            color="orange"
            button="Request Delivery"
          />

          <ServiceCard
            icon="🛥️"
            title="Captain My Boat"
            slogan="Your Boat. Our Captain."
            description="Need someone to operate your boat? We'll drive your boat so everyone gets where they need to go safely."
            href="/on-the-lake/captain"
            color="green"
            button="Request Captain"
          />
        </div>
      </section>
    </main>
  );
}