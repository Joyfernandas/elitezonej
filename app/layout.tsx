import type { Metadata } from "next";
import "./globals.css";
import "./disturbia.css";

const SITE_URL = "https://elitezonej.com"; // update when production domain is set

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
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Only the three fonts the Disturbia theme actually uses now —
            dropped Cormorant, Montserrat, JetBrains Mono (~250 KB saved). */}
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Pirata+One&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
