type HeroProps = {
  title: string;
  subtitle: string;
  tagline: string;
};

export default function Hero({
  title,
  subtitle,
  tagline,
}: HeroProps) {
  return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-sky-700 to-cyan-500 text-white shadow-xl">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h1 className="text-5xl font-black tracking-tight">
          {title}
        </h1>

        <p className="mt-4 text-2xl font-semibold">
          {subtitle}
        </p>

        <p className="mt-6 text-lg text-sky-100">
          {tagline}
        </p>
      </div>
    </section>
  );
}