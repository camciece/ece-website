import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ece Çamcı — AI • Product • Cloud",
  description: "AI-driven product & partner marketing leader.",
  openGraph: { title: "Ece Çamcı", description: "AI • Product • Cloud" },
  metadataBase: new URL("https://example.com"), // change after you add your domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-zinc-900">{children}</body>
    </html>
  );
}
