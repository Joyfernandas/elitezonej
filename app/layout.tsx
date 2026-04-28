import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import "./disturbia.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://elitezonej.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elite Zone J — Premium Tailoring · India",
    template: "%s · Elite Zone J",
  },
  description:
    "Designer-led men's and women's tailoring from India. Suits, sherwanis, lehengas, and bespoke services. Made-to-measure in seven days.",
  keywords: [
    "Indian tailoring", "bespoke suit India", "sherwani", "lehenga",
    "made to measure", "wedding suit", "Delhi tailoring", "men's tailoring",
  ],
  authors: [{ name: "Elite Zone J" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Elite Zone J",
    locale: "en_IN",
    title: "Elite Zone J — Premium Tailoring · India",
    description:
      "Designer-led men's and women's tailoring. Suits, sherwanis, lehengas. Made-to-measure in seven days.",
    images: [
      {
        url: "/generated/_sections/hero.webp",
        width: 1536,
        height: 1024,
        alt: "Elite Zone J — premium tailored three-piece suit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Zone J — Premium Tailoring · India",
    description: "Made-to-measure in seven days.",
    images: ["/generated/_sections/hero.webp"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/logo/favicon-32.png",  type: "image/png", sizes: "32x32"  },
      { url: "/logo/favicon-64.png",  type: "image/png", sizes: "64x64"  },
      { url: "/logo/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo/favicon-180.png",
    shortcut: "/logo/favicon-32.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFBF8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
