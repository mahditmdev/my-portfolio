import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahdi Teymouri | Portfolio",
  description: "Front-end Developer Portfolio",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mahdi Teymouri",
  },
};

// تنظیمات بهینه برای تمام‌صفحه شدن در iOS و داینامیک آیلند
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // اجازه می‌دهد صفحه به بخش بالای داینامیک آیلند امتداد پیدا کند
  themeColor: "#000000", // هماهنگ‌سازی رنگ استاتوس بار با جزیره پویا
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased font-sans bg-white text-zinc-950">
        {children}
      </body>
    </html>
  );
}
