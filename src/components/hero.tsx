"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  LayoutGroup,
} from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import Projects from "./projects";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToTarget, setIsScrolledToTarget] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest > 0.32 && !isScrolledToTarget) {
      setIsScrolledToTarget(true);
    } else if (latest <= 0.32 && isScrolledToTarget) {
      setIsScrolledToTarget(false);
    }
  });

  // ۱. انیمیشن محو شدن اجزای هیرو اول (به جز کلمه مشترک)
  const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.25], [0, -30]);

  // ۲. انیمیشن کلمات اطراف کلمه مقصد و فلش
  const targetWordsOpacity = useTransform(
    smoothProgress,
    [0.28, 0.42, 0.6, 0.68],
    [0, 1, 1, 0]
  );
  const targetWordsY = useTransform(smoothProgress, [0.28, 0.42], [24, 0]);

  const arrowOpacity = useTransform(
    smoothProgress,
    [0.32, 0.45, 0.6, 0.68],
    [0, 1, 1, 0]
  );
  const arrowPathProgress = useTransform(
    smoothProgress,
    [0.38, 0.6],
    [0.02, 1]
  );
  const arrowHeadOpacity = useTransform(smoothProgress, [0.55, 0.6], [0, 1]);

  // ۳. انیمیشن بالا آمدن شیت پروژه‌ها
  const sheetY = useTransform(smoothProgress, [0.65, 0.8], ["100%", "0%"]);
  const sheetScale = useTransform(smoothProgress, [0.65, 0.8], [0.95, 1]);
  const sheetRadius = useTransform(
    smoothProgress,
    [0.65, 0.8],
    ["36px", "0px"]
  );

  const sharedSpringTransition = {
    layout: {
      type: "spring" as const,
      stiffness: 110,
      damping: 22,
      mass: 0.8,
    },
  };

  return (
    <LayoutGroup id="interactive-morph-group">
      <div
        ref={containerRef}
        id="hero"
        className="relative min-h-[450dvh] w-full"
      >
        {/* کانتینر استیکی در طول اسکرول */}
        <div className="sticky top-0 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden">
          
          {/* ۱. محتوای تیتر اول هیرو */}
          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
            
            {/* نشان استاتوس */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wide text-zinc-700">
                Available for freelance &amp; full-time roles
              </span>
            </motion.div>

            {/* تیتر اصلی با کلمه Morphing */}
            <h1 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-4xl font-black tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              <motion.span
                style={{ opacity: heroOpacity, y: heroY }}
                className="inline-block whitespace-nowrap"
              >
                Crafting minimal &amp;
              </motion.span>

              {!isScrolledToTarget ? (
                <motion.span
                  layoutId="interactive-keyword"
                  transition={sharedSpringTransition}
                  className="inline-block whitespace-nowrap bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text font-black text-transparent"
                >
                  interactive
                </motion.span>
              ) : (
                <span
                  aria-hidden="true"
                  className="inline-block whitespace-nowrap opacity-0 select-none pointer-events-none"
                >
                  interactive
                </span>
              )}

              <motion.span
                style={{ opacity: heroOpacity, y: heroY }}
                className="inline-block whitespace-nowrap"
              >
                web products.
              </motion.span>
            </h1>

            {/* بیوگرافی */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="mt-6 max-w-2xl rounded-2xl border border-zinc-200/60 bg-white/60 p-5 text-sm text-zinc-600 shadow-sm backdrop-blur-md sm:text-base"
            >
              I&apos;m a Front-End Developer specializing in building modern
              web applications with a focus on smooth interactions, clean UI
              architecture, and high performance.
            </motion.div>

            {/* دکمه‌های اقدام */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4"
            >
            </motion.div>
          </div>

          {/* ۲. بخش تیتر مقصد و انیمیشن فلش */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start px-4 pt-28">
            <div className="z-10 flex flex-col items-center justify-center text-center">
              <h2 className="flex flex-wrap items-center justify-center gap-x-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-4xl">
                <motion.span
                  style={{ opacity: targetWordsOpacity, y: targetWordsY }}
                  className="inline-block"
                >
                  Explore my
                </motion.span>

                {isScrolledToTarget ? (
                  <motion.span
                    layoutId="interactive-keyword"
                    transition={sharedSpringTransition}
                    className="inline-block whitespace-nowrap bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text font-black text-transparent"
                  >
                    interactive
                  </motion.span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="inline-block whitespace-nowrap opacity-0 select-none pointer-events-none"
                  >
                    interactive
                  </span>
                )}

                <motion.span
                  style={{ opacity: targetWordsOpacity, y: targetWordsY }}
                  className="inline-block"
                >
                  creations.
                </motion.span>
              </h2>
            </div>

            {/* فلش SVG متحرک */}
            <motion.div
              style={{ opacity: arrowOpacity }}
              className="relative mt-4 flex h-[35vh] w-full max-w-lg items-center justify-center overflow-visible"
            >
              <svg
                viewBox="0 0 200 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto overflow-visible"
              >
                <motion.path
                  d="M100 10 C160 90, 40 170, 100 250 C150 310, 70 340, 100 370"
                  stroke="url(#arrowLongGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ pathLength: arrowPathProgress }}
                />
                <motion.path
                  d="M88 356 L100 370 L112 356"
                  stroke="#f43f5e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: arrowHeadOpacity }}
                />
                <defs>
                  <linearGradient
                    id="arrowLongGradient"
                    x1="100"
                    y1="10"
                    x2="100"
                    y2="370"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#fb923c" />
                    <stop offset="0.5" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>

          {/* ۳. کامپوننت شیت پروژه‌ها */}
          <Projects
            scrollProgress={smoothProgress}
            sheetY={sheetY}
            sheetScale={sheetScale}
            sheetRadius={sheetRadius}
          />
        </div>
      </div>
    </LayoutGroup>
  );
}
