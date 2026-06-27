"use client";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mt-8 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-3 text-base leading-relaxed text-white/65">
        {subtitle}
      </p>
    </div>
  );
}