import type { Metadata } from "next";
import Script from "next/script";
import { AnalyticsConsent } from "@/components/analytics-consent";
import "./globals.css";
import "./relationship.css";

const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const adsEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
const hasAdUnits = Boolean(
  process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_BROWSE_SLOT_ID ||
  process.env.NEXT_PUBLIC_ADSENSE_PROFILE_SLOT_ID,
);

export const metadata: Metadata = {
  metadataBase: new URL("https://workoutappindex.com"),
  title: "Workout App Index | Find the Right Workout App",
  description:
    "Find and compare strength-training apps by features, programming style, price, AI use, and overall quality.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  ...(adClientId ? { other: { "google-adsense-account": adClientId } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {adsEnabled && adClientId && hasAdUnits ? (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        ) : null}
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
