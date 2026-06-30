"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";

type LocateMeButtonProps = {
  onLocation: (location: string) => void;
  label?: string;
};

export default function LocateMeButton({
  onLocation,
  label = "Use My Current Location",
}: LocateMeButtonProps) {
  const [loading, setLoading] = useState(false);

  function locateMe() {
    if (!navigator.geolocation) {
      alert("Location is not available on this device.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const lat = latitude.toFixed(6);
        const lng = longitude.toFixed(6);
        const accuracyText = Math.round(accuracy);

        onLocation(
          `GPS Pin: https://www.google.com/maps?q=${lat},${lng} (${accuracyText}m accuracy)`
        );
        setLoading(false);
      },
      () => {
        setLoading(false);
        alert("We could not access your location. You can still type it in.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 60_000,
        timeout: 10_000,
      }
    );
  }

  return (
    <button
      type="button"
      onClick={locateMe}
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-[18px] border border-[#19C6FF]/25 bg-[#0A84FF]/10 px-4 py-3 text-sm font-black text-[#D9F4FF] transition active:scale-[0.985] disabled:opacity-60"
    >
      <LocateFixed size={18} />
      {loading ? "Finding Location..." : label}
    </button>
  );
}
