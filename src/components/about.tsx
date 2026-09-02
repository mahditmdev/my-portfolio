"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  animate,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiZap,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiTerminal,
  FiMapPin,
} from "react-icons/fi";

/* =========================================================================
   پرچم‌ها (SVG اختصاصی و بهینه)
========================================================================= */
function IranFlag() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <clipPath id="iran-circle">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#iran-circle)">
        <rect x="0" y="0" width="32" height="10.66" fill="#239F40" />
        <rect x="0" y="10.66" width="32" height="10.66" fill="#FFFFFF" />
        <rect x="0" y="21.32" width="32" height="10.68" fill="#DA0000" />
        <path
          d="M16 12.5 C15 13.5 14 15 14 16.5 C14 17.5 14.8 18.2 16 18.2 C17.2 18.2 18 17.5 18 16.5 C18 15 17 13.5 16 12.5 Z"
          fill="#DA0000"
        />
        <circle cx="16" cy="16" r="1.2" fill="#DA0000" />
      </g>
    </svg>
  );
}

function USFlag() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <clipPath id="us-circle">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#us-circle)">
        <rect width="32" height="32" fill="#B22234" />
        <path
          d="M0 2.46h32M0 7.38h32M0 12.3h32M0 17.22h32M0 22.14h32M0 27.06h32"
          stroke="#FFFFFF"
          strokeWidth="2.46"
        />
        <rect width="14" height="14" fill="#3C3B6E" />
        <circle cx="4" cy="4" r="1" fill="#FFFFFF" />
        <circle cx="10" cy="4" r="1" fill="#FFFFFF" />
        <circle cx="7" cy="7" r="1" fill="#FFFFFF" />
        <circle cx="4" cy="10" r="1" fill="#FFFFFF" />
        <circle cx="10" cy="10" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/* =========================================================================
   هندسه قوسی برای گوشه بالا-راست (Top-Right)
========================================================================= */
const VIEWBOX_SIZE = 100;
const CENTER_X = 36;
const CENTER_Y = 64;
const RADIUS = 44;

const START_X = CENTER_X + RADIUS; // 80
const START_Y = CENTER_Y;          // 64
const END_X = CENTER_X;            // 36
const END_Y = CENTER_Y - RADIUS;   // 20

const ARC_D_PATH = `M ${START_X} ${START_Y} A ${RADIUS} ${RADIUS} 0 0 0 ${END_X} ${END_Y}`;

function CurvedLanguageToggle({
  lang,
  onToggle,
}: {
  lang: "fa" | "en";
  onToggle: (next: "fa" | "en") => void;
}) {
  const isFa = lang === "fa";
  const progress = useMotionValue(isFa ? 1 : 0);

  // محاسبه دقیق مرکز دکمه روی قوس بر حسب درصد پیشرفت
  const x = useTransform(progress, (p) => {
    const angle = p * (Math.PI / 2);
    return `${CENTER_X + RADIUS * Math.cos(angle)}%`;
  });

  const y = useTransform(progress, (p) => {
    const angle = p * (Math.PI / 2);
    return `${CENTER_Y - RADIUS * Math.sin(angle)}%`;
  });

  // مماس بودن کپسول با زاویه قوس
  const rotate = useTransform(progress, [0, 1], [-90, 0]);
  const counterRotate = useTransform(progress, [0, 1], [90, 0]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextLang = isFa ? "en" : "fa";
    onToggle(nextLang);
    animate(progress, nextLang === "fa" ? 1 : 0, {
      type: "spring",
      stiffness: 180,
      damping: 20,
      mass: 0.8,
    });
  };

  return (
    <div className="relative w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] select-none flex items-center justify-center shrink-0 pointer-events-auto scale-90 sm:scale-100 origin-top-right">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        fill="none"
      >
        <defs>
          <linearGradient id="topRightArcGlow" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fb923c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
          </linearGradient>

          <filter id="glowBlurTR" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          d={ARC_D_PATH}
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="22"
          strokeLinecap="round"
        />

        <path
          d={ARC_D_PATH}
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        <path
          d={ARC_D_PATH}
          stroke="url(#topRightArcGlow)"
          strokeWidth="8"
          strokeLinecap="round"
          filter="url(#glowBlurTR)"
          className="opacity-80"
        />
      </svg>

      <motion.button
        type="button"
        onClick={handleClick}
        aria-label="Toggle language"
        className="absolute z-30 cursor-pointer outline-none focus:outline-none"
        style={{
          left: x,
          top: y,
          x: "-50%",
          y: "-50%",
          rotate,
          transformOrigin: "center center",
          width: "42px",
          height: "24px",
        }}
      >
        <div className="absolute inset-0 -z-10 rounded-full blur-[6px] bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 opacity-70" />

        <div className="relative w-full h-full rounded-full flex items-center justify-between px-1 bg-gradient-to-b from-white to-zinc-200 shadow-[0_3px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,1)]">
          <motion.div
            className="w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shadow-xs ring-1 ring-black/5 shrink-0"
            style={{ rotate: counterRotate }}
          >
            <AnimatePresence mode="wait">
              {isFa ? (
                <motion.div
                  key="flag-fa"
                  className="w-full h-full"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IranFlag />
                </motion.div>
              ) : (
                <motion.div
                  key="flag-en"
                  className="w-full h-full"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <USFlag />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="w-1.5 h-1.5 rounded-full ml-1 bg-orange-500 shadow-[0_0_6px_#f97316] shrink-0" />
        </div>
      </motion.button>
    </div>
  );
}

/* =========================================================================
   کامپوننت ترنزیشن نرم متن‌ها (Smooth Responsive Crossfade)
========================================================================= */
function AnimatedText({
  children,
  textKey,
  className = "",
}: {
  children: React.ReactNode;
  textKey: string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={textKey}
        initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* =========================================================================
   محتوای چندزبانه (fa / en)
========================================================================= */
const content = {
  fa: {
    badge: "درباره من",
    heading: "طراحی و مهندسی تجربه‌های دیجیتال سریع و بی‌نقص",
    available: "آماده همکاری",
    name: "مهدی تیموری",
    role: "توسعه‌دهنده فرانت‌اند",
    location: "ایران",
    bioTitle: "سلام، من مهدی هستم 👋",
    bioP1:
      "توسعه‌دهنده فرانت‌اند با تمرکز ویژه بر ساخت وب‌اپلیکیشن‌های سریع، مدرن و تعاملی. علاقه اصلی من تبدیل ایده‌های پیچیده به رابط‌های کاربری تمیز و فوق‌العاده نرم با بالاترین استانداردهای پرفورمنس است.",
    bioP2:
      "از معماری سیستم‌های مقیاس‌پذیر گرفته تا جزئی‌ترین میکرواینتراکشن‌ها و انیمیشن‌ها، همواره تلاش می‌کنم محصولی خلق کنم که هم برای کاربر جذاب باشد و هم کدی پایدار و خوانا داشته باشد.",
    highlights: [
      "توسعه وب‌اپلیکیشن‌های مقیاس‌پذیر و واکنش‌گرا با Next.js و React",
      "طراحی و پیاده‌سازی انیمیشن‌های تعاملی و Micro-interactions با Framer Motion",
      "تعهد کامل به Clean Code، معماری تمیز و کامپوننت‌محور با TypeScript",
      "بهینه‌سازی عملکرد (Performance Optimization) و استانداردهای Core Web Vitals",
    ],
    stats: [
      { label: "سال سابقه فعالیت", value: "+۳" },
      { label: "پروژه موفق و کامل", value: "+۲۰" },
      { label: "کیفیت کد و UI/UX", value: "۱۰۰٪" },
    ],
    ctaTitle: "همکاری و پروژه‌های جدید",
    ctaDesc:
      "مشتاق همکاری روی محصولات نوآورانه، مقیاس‌پذیر و چالش‌های جدید در فضای وب و فرانت‌اند هستم.",
    ctaButton: "ارتباط و شروع گفتگو",
  },
  en: {
    badge: "About Me",
    heading: "Designing & Engineering Fast, Flawless Digital Experiences",
    available: "Available to work",
    name: "Mahdi Teymouri",
    role: "Front-End Developer",
    location: "Iran",
    bioTitle: "Hey, I'm Mahdi 👋",
    bioP1:
      "A passionate Front-End Developer specialized in building blazing-fast, modern, and interactive web applications. My focus is turning complex ideas into clean, seamless user interfaces with top-tier performance.",
    bioP2:
      "From architecting scalable systems to crafting intricate micro-interactions and smooth animations, I strive to deliver products that users love and codebases that stay rock-solid.",
    highlights: [
      "Scalable & responsive web apps built with Next.js and React",
      "Interactive animations & micro-interactions with Framer Motion",
      "Dedicated to Clean Code & modular architecture with TypeScript",
      "Performance optimization & Core Web Vitals best practices",
    ],
    stats: [
      { label: "Years Experience", value: "3+" },
      { label: "Completed Projects", value: "20+" },
      { label: "Code Quality & UI/UX", value: "100%" },
    ],
    ctaTitle: "Open for Collaborations",
    ctaDesc:
      "Excited to collaborate on innovative products, scalable architectures, and modern web challenges.",
    ctaButton: "Get in Touch & Let's Talk",
  },
};

export default function About() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [isImageActive, setIsImageActive] = useState(false);
  const t = content[lang];
  const isRtl = lang === "fa";

  return (
    <section
      id="about"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden transition-[direction] duration-300"
    >
      {/* تیتر بخش */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4"
        >
          <FiTerminal className="h-3.5 w-3.5" />
          <AnimatedText textKey={`badge-${lang}`}>
            <span>{t.badge}</span>
          </AnimatedText>
        </motion.div>

        <AnimatedText textKey={`head-${lang}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight max-w-2xl px-2">
            {t.heading}
          </h2>
        </AnimatedText>
      </div>

      {/* چیدمان شبکه‌ای Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ۱. کارت تصویر شخصی */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={() => setIsImageActive((prev) => !prev)}
          className="lg:col-span-4 relative group rounded-3xl overflow-hidden bg-zinc-900 min-h-[360px] sm:min-h-[400px] lg:min-h-[auto] border border-zinc-200 shadow-lg cursor-pointer select-none"
        >
          <Image
            src="/about/img.png"
            alt="Mahdi Teymouri"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className={`object-cover object-center transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105 ${
              isImageActive ? "grayscale-0 scale-105" : "grayscale"
            }`}
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

          {/* نشان وضعیت آنلاین */}
          <div
            className={`absolute top-4 ${
              isRtl ? "right-4" : "left-4"
            } z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs transition-all duration-300 pointer-events-none`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <AnimatedText textKey={`status-${lang}`}>
              <span className="text-[11px] font-medium">{t.available}</span>
            </AnimatedText>
          </div>

          <div className="absolute bottom-5 right-5 left-5 z-10 flex items-center justify-between text-white pointer-events-none">
            <AnimatedText textKey={`author-${lang}`}>
              <h4 className="font-bold text-base">{t.name}</h4>
              <p className="text-xs text-zinc-400">{t.role}</p>
            </AnimatedText>

            <div className="flex items-center gap-1 text-[11px] text-zinc-400 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">
              <FiMapPin className="h-3 w-3 text-orange-400" />
              <AnimatedText textKey={`loc-${lang}`}>
                <span>{t.location}</span>
              </AnimatedText>
            </div>
          </div>
        </motion.div>

        {/* ۲. کارت بیوگرافی و هایلایت‌ها */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-8 relative flex flex-col justify-between rounded-3xl bg-zinc-50 border border-zinc-200/80 p-6 sm:p-10 shadow-sm group hover:border-orange-500/30 transition-colors"
        >
          {/* دکمه هلالی: فیکس روی قوس */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 pointer-events-auto">
            <CurvedLanguageToggle lang={lang} onToggle={(next) => setLang(next)} />
          </div>

          {/* محتوای متنی کارت */}
          <div className="relative z-10 pt-8 sm:pt-4 pr-12 sm:pr-14">
            <AnimatedText textKey={`bio-title-${lang}`}>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-4">
                {t.bioTitle}
              </h3>
            </AnimatedText>

            <AnimatedText textKey={`bio-body-${lang}`} className="space-y-4">
              <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                {t.bioP1}
              </p>
              <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                {t.bioP2}
              </p>
            </AnimatedText>
          </div>

          {/* هایلایت‌ها */}
          <div className="relative z-10 mt-8 pt-6 border-t border-zinc-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.highlights.map((item, idx) => (
              <AnimatedText key={idx} textKey={`hl-${lang}-${idx}`}>
                <div className="flex items-start gap-2.5">
                  <FiCheckCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-700 font-medium leading-tight">
                    {item}
                  </span>
                </div>
              </AnimatedText>
            ))}
          </div>
        </motion.div>

        {/* ۳. کارت آمار عددی */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 grid grid-cols-3 gap-2 sm:gap-3 p-5 sm:p-8 rounded-3xl bg-zinc-900 text-white shadow-xl"
        >
          {t.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center justify-center">
              <AnimatedText textKey={`stat-val-${lang}-${idx}`}>
                <span className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </AnimatedText>
              <AnimatedText textKey={`stat-lbl-${lang}-${idx}`}>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 mt-1.5 font-medium leading-snug">
                  {stat.label}
                </span>
              </AnimatedText>
            </div>
          ))}
        </motion.div>

        {/* ۴. کارت دکمه CTA و همکاری */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-orange-500/10 via-rose-500/5 to-transparent border border-orange-500/20 p-6 sm:p-8"
        >
          <div>
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <FiZap className="h-5 w-5" />
              <AnimatedText textKey={`cta-t-${lang}`}>
                <span className="text-sm font-bold">{t.ctaTitle}</span>
              </AnimatedText>
            </div>
            <AnimatedText textKey={`cta-d-${lang}`}>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                {t.ctaDesc}
              </p>
            </AnimatedText>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-between mt-6 px-5 py-3.5 rounded-2xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-all group"
          >
            <AnimatedText textKey={`cta-btn-${lang}`}>
              <span>{t.ctaButton}</span>
            </AnimatedText>
            {isRtl ? (
              <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
