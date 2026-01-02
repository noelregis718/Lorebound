"use client";
import { motion } from "framer-motion";

export default function FloatingBook({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="cursor-pointer"
      onClick={onOpen}
    >
      <motion.img
        src="/book.jpg"  // add book image in /public
        alt="Magic Book"
        className="w-64 drop-shadow-2xl"
        whileHover={{ scale: 1.05 }}
      />
    </motion.div>
  );
}
