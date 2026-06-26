"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function ServiceCard({
  title,
  subtitle,
  icon,
  onClick,
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full rounded-3xl bg-white p-6 shadow-md border text-left"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-4xl mb-3">{icon}</div>

          <h2 className="text-2xl font-bold">{title}</h2>

          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>

        <ChevronRight size={30} />
      </div>
    </motion.button>
  );
}