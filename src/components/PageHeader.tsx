"use client";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mt-8 text-center text-[#FFFFFF]">
      <h1 className="text-4xl font-black tracking-tight text-[#FFFFFF]">
        {title}
      </h1>

      <p className="mx-auto mt-4 max-w-sm text-lg leading-relaxed text-[#FFFFFF]">
        {subtitle}
      </p>
    </div>
  );
}