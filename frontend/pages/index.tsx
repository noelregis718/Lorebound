"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FloatingBook from "@/components/FloatingBook";
import BookOpen from "@/components/BookOpen";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing() {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  function handleOpen() {
  // 🔊 Play page flip sound (user gesture safe)
  new Audio("/page-flip1.mp3").play();

  setOpened(true);

  // Navigate after animation finishes
  setTimeout(() => {
    router.push("/room/join");
  }, 1400);
}

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="book"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FloatingBook onOpen={handleOpen} />
            <p className="text-center text-gray-300 mt-4 italic">
              Tap to begin your story
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && <BookOpen />}
    </div>
  );
}
