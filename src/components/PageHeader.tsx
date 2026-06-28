"use client";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mt-8 text-center">
      <h1 className="text-4xl font-black tracking-tight text-white">
        {title}
      </h1>

      <p className="mx-auto mt-4 max-w-sm text-lg leading-relaxed text-white">
        {subtitle}
      </p>
    </div>
  );
}