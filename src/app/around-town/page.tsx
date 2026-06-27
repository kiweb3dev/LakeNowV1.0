import ServiceCard from "@/components/ServiceCard";

export default function AroundTown() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-3 text-5xl font-black">
          Around Town
        </h1>

        <p className="mb-10 text-xl text-gray-600">
          Safe, reliable transportation throughout Lake of the Ozarks.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

          <ServiceCard
            icon="🚗"
            title="Get a Ride"
            slogan="Your Destination. Our Driver."
            description="Bars, restaurants, hotels, vacation rentals, marinas and home."
            href="/around-town/ride"
            color="blue"
            button="Request Ride"
          />

          <ServiceCard
            icon="📦"
            title="Delivery"
            slogan="Your Order. Delivered."
            description="Food, drinks, groceries, supplies and more delivered around town."
            href="/delivery"
            color="orange"
            button="Request Delivery"
          />

        </div>

      </div>
    </main>
  );
}