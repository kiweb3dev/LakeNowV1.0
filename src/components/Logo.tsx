"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 90 }: LogoProps) {
  return (
    <div className="flex flex-col items-center">

      {/* Temporary Logo */}
      <Image
        src="/logo-temp.png"
        alt="LakeNow"
        width={size}
        height={size}
        priority
      />

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white">
        LakeNow
      </h1>

      <p className="mt-1 text-white/60 tracking-[0.25em] uppercase text-sm text-center">
        Rides • Deliveries • On The Lake
      </p>

    </div>
  );
}