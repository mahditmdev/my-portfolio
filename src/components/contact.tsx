"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Contact() {
  return (
    <footer id="contact" className="relative z-10 border-t border-zinc-200/80 bg-zinc-50/50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
            آماده همکاری روی پروژه‌های جدید
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-zinc-500 sm:text-base">
            اگر پروژه‌ای در ذهن دارید یا مایل به همکاری هستید، خوشحال می‌شوم با من در ارتباط باشید.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mahditm.developer@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-800"
            >
              <HiOutlineMail className="h-5 w-5" />
              <span>ارسال ایمیل</span>
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-zinc-500">
            <a
              href="https://github.com/mahditmdev"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-zinc-200 bg-white p-3 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-zinc-200 bg-white p-3 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/Amahdit"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="rounded-full border border-zinc-200 bg-white p-3 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              <FaTelegramPlane className="h-5 w-5" />
            </a>
          </div>

          <p className="mt-12 text-xs text-zinc-400">
            طراحی و پیاده‌سازی شده با Next.js، Tailwind CSS و Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
