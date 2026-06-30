"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 150, className = "" }: LogoProps) {
  const height = Math.round(size * (816 / 1317));

  return (
    <Image
      src="/logo-primary-transparent.png"
      alt="LakeNow"
      width={size}
      height={height}
      priority
      className={`h-auto object-contain drop-shadow-[0_14px_30px_rgba(10,132,255,0.28)] ${className}`}
    />
  );
}
