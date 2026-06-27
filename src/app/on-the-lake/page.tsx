import ServiceCard from "@/components/ServiceCard";

export default function OnTheLake() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-3 text-5xl font-black">
          🌊 On the Lake
        </h1>

        <p className="mb-10 text-xl text-gray-600">
          Transportation and services built specifically for Lake of the Ozarks.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

          <ServiceCard
            icon="🚤"
            title="Water Taxi"
            slogan="Your Dock. Our Boat."
            description="Fast dock-to-dock transportation anywhere on the lake."
            href="/on-the-lake/water-taxi"
            color="teal"
            button="Request Water Taxi"
          />

          <ServiceCard
            icon="📦"
            title="Boat Delivery"
            slogan="Your Order. Delivered."
            description="Food, drinks, groceries, ice and supplies delivered directly to your dock."
            href="/on-the-lake/delivery"
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

      </div>
    </main>
  );
}