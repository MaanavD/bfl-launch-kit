import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FLUX.2 Launch Kit — Case Study by Maanav",
  description:
    "Launch-day content for FLUX.2: written tutorial, video walkthrough, blog post, and strategy — all in one place.",
  icons: {
    icon: "/bfl-symbol-black.svg",
  },
  openGraph: {
    title: "FLUX.2 Launch Kit — Case Study",
    description:
      "Launch-day content for FLUX.2: written tutorial, video walkthrough, blog post, and strategy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
