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
        width={size * 3.9}
        height={size}
        priority
        className="h-auto max-w-full object-contain mix-blend-screen drop-shadow-[0_12px_30px_rgba(37,99,235,0.35)]"
      />
    </div>
  );
}