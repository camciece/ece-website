import Header from '@/components/header'
import I18nProvider from '@/components/i18n-provider'
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
  title: 'The website of Ece Çamcı | Eces Notes',
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
        <I18nProvider>
          <Header />
          <div>{children}</div>
        </I18nProvider>
      </body>
    </html>
  )
}
