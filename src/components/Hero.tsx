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
    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-sky-900
      via-cyan-800
      to-slate-900
      text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">

        <div className="mb-6 text-7xl">
          🚤
        </div>

        <h1 className="text-6xl font-black tracking-tight">
          {title}
        </h1>

        <p className="mt-4 text-2xl font-semibold opacity-90">
          {subtitle}
        </p>

        <p className="mx-auto mt-8 max-w-2xl text-xl opacity-80">
          {tagline}
        </p>

      </div>
    </section>
  );
}