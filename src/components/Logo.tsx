"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 82, className = "" }: LogoProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src="/logo.png"
        alt="LakeNow"
        width={size * 3.8}
        height={size}
        priority
        className="h-auto w-auto max-w-full object-contain mix-blend-screen"
      />
    </div>
  );
}