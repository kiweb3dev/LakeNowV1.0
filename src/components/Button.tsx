import Link from "next/link";

type ServiceCardProps = {
  icon: string;
  title: string;
  slogan: string;
  description: string;
  href: string;
  color: "blue" | "teal" | "orange" | "green";
  button: string;
};

const colors = {
  blue: {
    border: "border-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  teal: {
    border: "border-cyan-500",
    button: "bg-cyan-600 hover:bg-cyan-700",
  },
  orange: {
    border: "border-orange-500",
    button: "bg-orange-600 hover:bg-orange-700",
  },
  green: {
    border: "border-green-500",
    button: "bg-green-600 hover:bg-green-700",
  },
};

export default function ServiceCard({
  icon,
  title,
  slogan,
  description,
  href,
  color,
  button,
}: ServiceCardProps) {
  return (
    <div
      className={`rounded-2xl border-l-8 ${colors[color].border}
      bg-white shadow-lg p-6 transition hover:shadow-xl`}
    >
      <div className="text-5xl">{icon}</div>

      <h2 className="mt-4 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 font-semibold text-gray-700">
        {slogan}
      </p>

      <p className="mt-4 text-gray-600 leading-relaxed">
        {description}
      </p>

      <Link href={href}>
        <button
          className={`mt-6 w-full rounded-xl px-4 py-3 text-white font-bold transition ${colors[color].button}`}
        >
          {button}
        </button>
      </Link>
    </div>
  );
}