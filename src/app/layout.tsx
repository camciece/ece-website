import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-news",
});

export const metadata: Metadata = {
  title: "Ece Çamcı — AI • Product • Partner Marketing",
  description:
    "AI-driven product & partner marketing leader. Writing about pragmatic AI, distributed cloud, and GTM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} bg-[--bg] text-[--text] antialiased`}
      >
        <body
          className={`${inter.variable} ${newsreader.variable} bg-[--bg] text-[--text] antialiased`}
        >
          <Header />
          <div className="container layout">{children}</div>
          <footer className="container site-footer">
            © {new Date().getFullYear()} Ece Çamcı • Impactful AI, Longevity,
            Lifestyle •{" "}
            <a
              href="https://www.linkedin.com/in/ececamci"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>{" "}
            · <a href="mailto:hello@ececamci.com">hello@ececamci.com</a>
          </footer>
        </body>
      </body>
    </html>
  );
}
