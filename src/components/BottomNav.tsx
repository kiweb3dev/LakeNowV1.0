"use client";

import { Car, Home, User, Waves } from "lucide-react";
import { useRouter } from "next/navigation";

type NavTab = "home" | "land" | "water" | "profile";

interface BottomNavProps {
  active?: NavTab;
}

const items = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "land", label: "Land", href: "/around-town", icon: Car },
  { key: "water", label: "Water", href: "/on-the-lake", icon: Waves },
  { key: "profile", label: "Profile", href: "/profile", icon: User },
] as const;

export default function BottomNav({ active }: BottomNavProps) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] px-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
    >
      <nav className="rounded-[28px] border border-[#FFFFFF]/10 bg-[#071426]/95 px-2 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="grid grid-cols-4 gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                onClick={() => router.push(item.href)}
                className={`flex min-h-[58px] flex-col items-center justify-center rounded-[22px] text-[11px] font-black transition active:scale-[0.97] ${
                  isActive
                    ? "bg-[#0A84FF] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/25"
                    : "text-[#FFFFFF]/50 hover:text-[#FFFFFF]"
                }`}
              >
                <Icon size={21} strokeWidth={2.5} />
                <span className="mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
