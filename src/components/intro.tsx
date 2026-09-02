"use client";
import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {

  const onCompleteRef = useRef(onComplete);
onCompleteRef.current = onComplete;
  // زمان پایان اینترو و باز شدن صفحه اصلی
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // متغیرهای انیمیشن کلمه به کلمه
  const sentenceVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // easeOutCubic نرم و طبیعی
      },
    },
  };

  const line1 = "Hi, welcome to my portfolio.";
  const line2Part1 = "My name is";
  const name = "Mahdi Teymouri.";

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        transition: {
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1], // پرده به بالا کشیده می‌شود
        },
      }}
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-full flex-col items-center justify-center bg-zinc-950 px-6 text-white select-none touch-none"
      style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
    >
      <div className="flex max-w-2xl flex-col items-center text-center">
        {/* نشانگر کوچک و مدرن بالا */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex items-center gap-2.5 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-3.5 py-1 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-medium tracking-widest text-zinc-400 uppercase">
            Front-end Developer
          </span>
        </motion.div>

        {/* متن خط اول و دوم با انیمیشن روان */}
        <motion.div
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-2"
        >
          {/* خط اول: Hi, welcome to my portfolio. */}
          <div className="flex flex-wrap justify-center gap-x-2">
            {line1.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={wordVariants}
                  className="inline-block text-xl sm:text-3xl md:text-4xl font-light text-zinc-300 tracking-tight"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* خط دوم: My name is Mahdi Teymouri. */}
          <div className="mt-1 flex flex-wrap justify-center items-center gap-x-2">
            {line2Part1.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={wordVariants}
                  className="inline-block text-2xl sm:text-3xl md:text-5xl font-light text-zinc-300 tracking-tight"
                >
                  {word}
                </motion.span>
              </span>
            ))}

            {/* نام به صورت بولد و گرادینت دار */}
            {name.split(" ").map((word, i) => (
              <span key={`name-${i}`} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  variants={wordVariants}
                  className="inline-block text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* خط پیشرفت زمان بارگذاری */}
        <div className="mt-10 h-[2px] w-36 overflow-hidden rounded-full bg-zinc-800/80">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2.7, ease: "easeInOut" }}
            className="h-full w-full bg-zinc-300"
          />
        </div>
      </div>
    </motion.div>
  );
}
