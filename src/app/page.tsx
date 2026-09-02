"use client";

import { useEffect, useState } from "react";
import Intro from "@/components/intro";
import AnimatedArrowsBg from "@/components/animated-arrows-bg";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = ""; // ✅ FIX: قبلاً "unset" بود که مقدار نامعتبر CSS است
    };
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Intro onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative bg-white">
          <AnimatedArrowsBg />
          <Navbar />

          <main className="relative z-10">
            <Hero />
            <About />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}
