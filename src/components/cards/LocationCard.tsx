"use client";

import { motion } from "framer-motion";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
  onClick: () => void;
};

export default function LocationCard({
  icon,
  title,
  subtitle,
  onClick,
}: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full rounded-3xl bg-white shadow-md border border-slate-100 p-6 text-left mb-4"
    >
      <div className="text-3xl">{icon}</div>

      <h2 className="mt-3 text-xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="text-slate-500 mt-1 text-sm">
        {subtitle}
      </p>
    </motion.button>
  );
}