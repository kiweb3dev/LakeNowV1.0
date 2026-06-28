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

      <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-white">
        {subtitle}
      </p>
    </div>
  );
}