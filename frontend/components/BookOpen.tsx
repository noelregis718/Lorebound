"use client";
import { motion } from "framer-motion";

export default function BookOpen() {
  return (
    <motion.div
      initial={{ scaleX: 0.2, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100"
    />
  );
}
