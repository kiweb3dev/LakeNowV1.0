"use client";

interface HeroCardProps {
  title: string;
  subtitle: string;
}

export default function HeroCard({ title, subtitle }: HeroCardProps) {
  return (
    <section className="rounded-[34px] border border-[#FFFFFF]/20 bg-[#071426] p-7 text-[#FFFFFF] shadow-2xl shadow-black/45">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#FFFFFF]">
        LAKENOW
      </p>

      <h1 className="mt-5 whitespace-pre-line text-6xl font-black leading-[0.92] tracking-tight text-[#FFFFFF]">
        {title}
      </h1>

      <p className="mt-6 text-lg font-black uppercase tracking-[0.18em] leading-relaxed text-[#FFFFFF]">
        {subtitle}
      </p>
    </section>
  );
}