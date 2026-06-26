"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center px-6 pt-10 pb-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight text-slate-900"
      >
        LakeNow
      </motion.h1>

      <p className="mt-2 text-lg font-medium text-slate-600">
        Transportation. Delivered.
      </p>

      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        Around Town or On the Lake—we'll get you there.
      </p>
    </div>
  );
}