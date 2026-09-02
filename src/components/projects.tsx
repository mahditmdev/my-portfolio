"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiHome,
  FiLayers,
  FiLock,
  FiTruck,
} from "react-icons/fi";

interface ProjectsProps {
  scrollProgress: MotionValue<number>;
  sheetY: MotionValue<string>;
  sheetScale: MotionValue<number>;
  sheetRadius: MotionValue<string>;
}

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metric: string;
  previewGradient: string;
  accentColor: string;
  image?: string;
  liveLink?: string;
  isPrivate?: boolean;
  type: "furniture" | "logistics" | "stealth";
}

const projectsData: ProjectItem[] = [
  {
    id: "01",
    title: "Relax Furniture",
    category: "Furniture Renovation Platform",
    description:
      "A specialized website for luxury furniture renovation and upholstery services in North Tehran. Designed with a clean visual hierarchy, optimized call-to-actions, responsive layouts, and strong performance.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Responsive UI", "SEO"],
    metric: "Live Production Website",
    previewGradient: "from-amber-500/30 via-orange-500/10 to-rose-500/20",
    accentColor: "text-amber-400",
    image: "/projects/relax-furniture.webp",
    liveLink: "https://relaxfurniture.ir",
    type: "furniture",
  },
  {
    id: "02",
    title: "Ehsan Tarabar",
    category: "Road Logistics Platform",
    description:
      "A modern corporate platform for a nationwide road freight and logistics company. The experience focuses on shipment inquiries, service discovery, fleet presentation, and direct client communication.",
    tags: [
      "React",
      "TypeScript",
      "Logistics UI",
      "Responsive Design",
      "Performance",
    ],
    metric: "Nationwide Freight Network",
    previewGradient: "from-cyan-500/30 via-blue-500/10 to-emerald-500/20",
    accentColor: "text-cyan-400",
    image: "/projects/ehsan-tarabar.webp",
    liveLink: "https://ehsantarabar.ir",
    type: "logistics",
  },
  {
    id: "03",
    title: "My Size",
    category: "Smart Sizing Ecosystem",
    description:
      "A confidential digital sizing assistant built to improve online clothing purchases. The product combines a modern Next.js platform, browser extension architecture, and intelligent sizing logic.",
    tags: [
      "Next.js",
      "Supabase",
      "Browser Extension",
      "Smart Sizing",
      "Private Alpha",
    ],
    metric: "In Development • Private Alpha",
    previewGradient: "from-violet-500/30 via-fuchsia-500/10 to-rose-500/20",
    accentColor: "text-rose-400",
    isPrivate: true,
    type: "stealth",
  },
];

const GRADIENTS = {
  furniture: "from-amber-500/30 via-orange-500/10 to-rose-500/20",
  logistics: "from-cyan-500/30 via-blue-500/10 to-emerald-500/20",
  stealth: "from-violet-500/30 via-fuchsia-500/10 to-rose-500/20",
} as const;

const ACCENTS = {
  furniture: "text-amber-400",
  logistics: "text-cyan-400",
  stealth: "text-violet-400",
} as const;

function ProjectIcon({ type }: { type: ProjectItem["type"] }) {
  if (type === "furniture") {
    return <FiHome className="h-8 w-8 text-amber-400 sm:h-10 sm:w-10" />;
  }
  if (type === "logistics") {
    return <FiTruck className="h-8 w-8 text-cyan-400 sm:h-10 sm:w-10" />;
  }
  return <FiLock className="h-8 w-8 text-rose-400 sm:h-10 sm:w-10" />;
}

export default function Projects({
  scrollProgress,
  sheetY,
  sheetScale,
  sheetRadius,
}: ProjectsProps) {
  const trackX = useTransform(
    scrollProgress,
    [0, 0.84, 1],
    ["0%", "0%", `-${((projectsData.length - 1) / projectsData.length) * 100}%`]
  );

  const progressScale = useTransform(
    scrollProgress,
    [0, 0.84, 1],
    [0, 0, 1]
  );

  return (
    <motion.div
      id="projects"
      style={{
        y: sheetY,
        scale: sheetScale,
        borderRadius: sheetRadius,
      }}
      className="absolute inset-0 z-30 h-full w-full overflow-hidden bg-[#090a0f] text-white shadow-2xl"
    >
      {/* افکت‌های گرادیان پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-orange-500/10 blur-[140px]" />
        <div className="absolute -bottom-48 right-0 h-[32rem] w-[32rem] rounded-full bg-rose-500/10 blur-[150px]" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/80 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* هدر بخش پروژه‌ها */}
      <header className="absolute inset-x-0 top-0 z-30 px-5 pt-5 sm:px-8 sm:pt-7 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-400 sm:text-xs">
                Featured Works
              </span>
            </div>
            <h2 className="mt-1 text-xl font-black tracking-tight text-white sm:text-3xl">
              Selected Projects
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-[10px] text-zinc-500 sm:text-xs">
              Scroll down to explore
            </span>
            <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-white/10 sm:w-36">
              <motion.div
                style={{
                  scaleX: progressScale,
                  transformOrigin: "left center",
                }}
                className="h-full w-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-rose-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* کانتینر حرکت افقی کارت‌ها */}
      <motion.div
        style={{ x: trackX }}
        className="relative z-10 flex h-full w-[300vw]"
      >
        {projectsData.map((project) => (
          <article
            key={project.id}
            className="flex h-full w-screen shrink-0 items-center px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:px-12"
          >
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8 lg:gap-14">
              {/* ستون مشخصات پروژه */}
              <div className="order-2 flex min-w-0 flex-col justify-center md:order-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-black text-orange-500 sm:text-2xl">
                    {project.id}
                  </span>
                  <span className="h-px w-8 bg-orange-500/50 sm:w-12" />
                  <span className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-orange-300 sm:text-xs">
                    {project.category}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  {project.isPrivate && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      <FiLock className="h-3 w-3" />
                      Stealth
                    </span>
                  )}
                </div>

                <p className="mt-3 max-w-xl text-xs leading-6 text-zinc-400 sm:mt-5 sm:text-sm sm:leading-7 lg:text-base">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-zinc-300 backdrop-blur-md sm:px-3 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-amber-300/90 sm:mt-6 sm:text-xs">
                  <FiLayers className="h-4 w-4" />
                  <span>{project.metric}</span>
                </div>

                <div className="mt-5 sm:mt-7">
                  {project.isPrivate ? (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-zinc-500"
                    >
                      <FiLock className="h-4 w-4" />
                      NDA / In Development
                    </button>
                  ) : (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-transform hover:scale-105"
                    >
                      Visit Website
                      <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* ستون کارت گرافیکی / تصویر هوشمند */}
              <div className="order-1 min-w-0 md:order-2">
                <div className="group relative mx-auto aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/80 p-2 shadow-2xl shadow-black/50 sm:rounded-3xl sm:p-3">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[project.type]} opacity-60 transition-opacity duration-500 group-hover:opacity-90`}
                  />

                  <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0c0d12]/90 sm:rounded-2xl">
                    {/* نوار بالایی مرورگر (Browser Bar) */}
                    <div className="z-20 flex h-10 shrink-0 items-center justify-between border-b border-white/10 bg-[#0c0d12]/80 px-3 backdrop-blur-md sm:h-12 sm:px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-500 sm:h-2.5 sm:w-2.5" />
                        <span className="h-2 w-2 rounded-full bg-amber-500 sm:h-2.5 sm:w-2.5" />
                        <span className="h-2 w-2 rounded-full bg-emerald-500 sm:h-2.5 sm:w-2.5" />
                      </div>
                      <span className="max-w-[55%] truncate font-mono text-[9px] text-zinc-400 sm:text-[11px]">
                        {project.liveLink
                          ? project.liveLink.replace("https://", "")
                          : "confidential.internal"}
                      </span>
                      <FiCode className="h-4 w-4 text-zinc-500" />
                    </div>

                    {/* کانتینر تصویر یا استیت Stealth */}
                    <div className="relative flex flex-1 items-center justify-center overflow-hidden">
                      {project.image ? (
                        <div className="relative h-full w-full overflow-hidden bg-zinc-950">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 650px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center">
                          <div
                            className={`absolute h-32 w-32 rounded-full bg-gradient-to-br ${GRADIENTS[project.type]} blur-3xl sm:h-48 sm:w-48`}
                          />
                          <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-xl backdrop-blur-xl sm:p-6">
                            <ProjectIcon type={project.type} />
                          </div>
                          <h4 className="relative mt-3 text-lg font-black text-white sm:mt-5 sm:text-2xl">
                            {project.title}
                          </h4>
                          <p
                            className={`relative mt-1 text-[10px] font-semibold sm:text-xs ${ACCENTS[project.type]}`}
                          >
                            Private product architecture
                          </p>
                        </div>
                      )}
                    </div>

                    {/* نوار پایینی وضعیت پروژه */}
                    <div className="z-20 flex h-10 shrink-0 items-center justify-between border-t border-white/10 bg-[#0c0d12]/80 px-4 text-[9px] text-zinc-400 backdrop-blur-md sm:h-12 sm:px-5 sm:text-[11px]">
                      <span>Project status</span>
                      <span
                        className={
                          project.isPrivate
                            ? "font-semibold text-amber-400"
                            : "font-semibold text-emerald-400"
                        }
                      >
                        {project.isPrivate
                          ? "In Development"
                          : "Live & Verified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </motion.div>

      {/* نشانگر شماره پروژه‌ها */}
      <div className="pointer-events-none absolute bottom-4 right-5 z-30 hidden items-center gap-2 font-mono text-[10px] text-zinc-600 sm:flex lg:right-12">
        <span>01</span>
        <span>—</span>
        <span>0{projectsData.length}</span>
      </div>
    </motion.div>
  );
}
