import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workout App Index | Find the Right Workout App",
  description: "Find and compare strength-training apps by features, programming style, price, AI use, and overall quality.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
