"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ArrowData {
  id: number;
  startX: number;
  startY: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AnimatedArrowsBg() {
  const [arrows, setArrows] = useState<ArrowData[]>([]);

  useEffect(() => {
    const generatedArrows: ArrowData[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      startX: Math.random() * 120 - 20,
      startY: Math.random() * 120 - 20,
      size: Math.random() * 16 + 24, // اندازه متعادل‌تر: 24px تا 40px
      duration: Math.random() * 6 + 12, // حرکت آرام‌تر و ملایم‌تر (12 تا 18 ثانیه)
      delay: Math.random() * 5,
    }));
    setArrows(generatedArrows);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {arrows.map((arrow) => (
        <motion.div
          key={arrow.id}
          initial={{
            x: `${arrow.startX}vw`,
            y: `${arrow.startY}vh`,
            opacity: 0,
            scale: 0.85,
          }}
          animate={{
            x: [`${arrow.startX}vw`, `${arrow.startX + 25}vw`],
            y: [`${arrow.startY}vh`, `${arrow.startY + 25}vh`],
            // حداکثر شفافیت به حدود 18٪ الی 20٪ کاهش یافته است
            opacity: [0, 0.18, 0.18, 0],
            scale: [0.85, 1, 1, 0.85],
          }}
          transition={{
            duration: arrow.duration,
            repeat: Infinity,
            ease: "linear",
            delay: arrow.delay,
            times: [0, 0.2, 0.8, 1],
          }}
          className="absolute"
        >
          <div className="relative flex items-center justify-center">
            <svg
              width={arrow.size}
              height={arrow.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5" // ضخامت ظریف‌تر
              strokeLinecap="round"
              strokeLinejoin="round"
              // گلو (Glow) نرم و کم‌رمق
              className="transform rotate-45 drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* هاله نور محیطی ملایم‌تر */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-orange-500/8 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
}
