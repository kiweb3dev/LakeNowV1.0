"use client";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-left text-[#FFFFFF]">
      <h1 className="text-[38px] font-black leading-none tracking-tight text-[#FFFFFF]">
        {title}
      </h1>

      <p className="mt-3 max-w-xs text-sm font-semibold leading-relaxed text-[#FFFFFF]/70">
        {subtitle}
      </p>
    </div>
  );
}
