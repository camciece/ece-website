import Header from '@/components/header'
import type { Metadata } from 'next'
import { Inter, Newsreader } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const newsreader = Newsreader({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-news',
})

export const metadata: Metadata = {
  title: 'Ece Çamcı — AI • Product • Partner Marketing',
  description:
    'AI-driven product & partner marketing leader. Writing about pragmatic AI, distributed cloud, and GTM.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
          <div>{children}</div>
        </body>
      </body>
    </html>
  )
}
