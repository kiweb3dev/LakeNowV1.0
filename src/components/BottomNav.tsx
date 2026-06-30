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
      <nav className="premium-card rounded-[28px] border border-[#19C6FF]/25 px-2 py-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="grid grid-cols-4 gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                onClick={() => router.push(item.href)}
                className={`relative flex min-h-[62px] flex-col items-center justify-center rounded-[22px] text-xs font-black transition duration-200 active:scale-[0.97] ${
                  isActive
                    ? "bg-gradient-to-br from-[#0A84FF] to-[#0878F0] text-[#FFFFFF] shadow-lg shadow-[#0A84FF]/30"
                    : "text-[#FFFFFF]/85 hover:bg-[#0D1626]/80 hover:text-[#FFFFFF]"
                }`}
              >
                {isActive && (
                  <span className="absolute top-2 h-1 w-6 rounded-full bg-[#FFFFFF]/80" />
                )}
                <Icon size={23} strokeWidth={2.8} />
                <span className="mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
