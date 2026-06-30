"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-5xl font-black tracking-tight text-white drop-shadow-[0_10px_28px_rgba(37,99,235,0.55)]">
        LAKE<span className="text-blue-400">NOW</span>
      </div>

      <div className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-white">
        Rides • Delivery • At The Lake
      </div>
    </div>
  );
}