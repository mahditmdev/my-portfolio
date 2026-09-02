"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiLayers,
  FiUser,
  FiSend,
  FiHome,
} from "react-icons/fi";

interface NavItem {
  id: string;
  label: string;
  href: `#${string}`;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    id: "hero",
    label: "Home",
    href: "#hero",
    icon: FiHome,
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: FiLayers,
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: FiUser,
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: FiSend,
  },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * تشخیص سکشن فعال با IntersectionObserver
   *
   * rootMargin باعث می‌شود بخش فعال در محدوده‌ی بالایی صفحه
   * بهتر تشخیص داده شود.
   */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            visibleSections.set(section.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(section.id);
          }
        });

        /**
         * از بین سکشن‌های قابل مشاهده، سکشنی انتخاب می‌شود
         * که بیشترین مقدار قابل مشاهده را دارد.
         */
        const mostVisibleSection = [...visibleSections.entries()].sort(
          (a, b) => b[1] - a[1]
        )[0];

        if (mostVisibleSection) {
          setActiveTab(mostVisibleSection[0]);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    /**
     * وقتی کاربر کاملاً به پایین صفحه رسید،
     * بخش Contact را فعال می‌کنیم.
     */
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 10) {
        const contactSection = document.getElementById("contact");

        if (contactSection) {
          setActiveTab("contact");
        }
      }

      /**
       * اگر کاربر در بالاترین قسمت صفحه باشد،
       * Home فعال می‌شود.
       */
      if (window.scrollY <= 10) {
        setActiveTab("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * اسکرول نرم به سکشن موردنظر
   */
  const handleScrollTo = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    setActiveTab(targetId);
    setMobileMenuOpen(false);

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    /**
     * به‌روزرسانی URL بدون رفرش صفحه
     */
    window.history.replaceState(null, "", href);
  };

  return (
    <>
      {/* Navbar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          className="pointer-events-auto relative flex w-full items-center justify-between gap-2 rounded-full border border-white/10 bg-black/80 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:w-auto sm:gap-6 sm:bg-[#0d0e15]/85 sm:p-2"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(event) => handleScrollTo(event, "#hero")}
            className="group flex items-center gap-2 rounded-full py-1 pl-1.5 pr-2.5 text-white transition-all hover:bg-white/5 sm:pl-2 sm:pr-3"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 text-[11px] font-black shadow-md shadow-orange-500/25 sm:h-8 sm:w-8 sm:text-xs">
              <span>MT</span>

              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full border border-black bg-emerald-500 sm:border-2 sm:border-[#0d0e15]" />
              </span>
            </div>

            <span className="text-xs font-bold tracking-tight text-zinc-200 group-hover:text-white">
              Mahdi
              <span className="hidden text-orange-500 sm:inline">
                .dev
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredTab(null)}
            className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.04] p-1 md:flex"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => handleScrollTo(event, item.href)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                    />
                  )}

                  {/* Hover Indicator */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hover-nav-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="absolute inset-0 rounded-full bg-white/10"
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5 font-medium">
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}
                    />

                    <span>{item.label}</span>
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="#contact"
              onClick={(event) => handleScrollTo(event, "#contact")}
              className="group relative inline-flex items-center gap-1 overflow-hidden rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-white/15 active:scale-95 sm:px-4 sm:py-2 sm:text-xs"
            >
              <span>Hire Me</span>

              <FiArrowUpRight className="h-3 w-3 text-orange-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-3.5 sm:w-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="flex rounded-full bg-white/5 p-1.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white sm:p-2 md:hidden"
            >
              {mobileMenuOpen ? (
                <FiX className="h-4 w-4" />
              ) : (
                <FiMenu className="h-4 w-4" />
              )}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 28,
            }}
            style={{
              top: "calc(env(safe-area-inset-top, 0px) + 4.25rem)",
            }}
            className="fixed inset-x-3 z-50 flex flex-col gap-1.5 rounded-3xl border border-white/15 bg-black/90 p-3 shadow-2xl backdrop-blur-3xl sm:inset-x-4 md:hidden"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => handleScrollTo(event, item.href)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-zinc-300 hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </span>

                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
