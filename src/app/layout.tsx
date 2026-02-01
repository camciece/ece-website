import Header from '@/components/header'
import I18nProvider from '@/components/i18n-provider'
import { defaultLocale } from '@/lib/locale'
import { getBaseUrl } from '@/lib/site'
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
  title: 'Eces Notes',
  metadataBase: new URL(getBaseUrl()),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = defaultLocale

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${newsreader.variable} bg-[--bg] text-[--text] antialiased`}
      >
        <I18nProvider locale={locale}>
          <Header />
          <div className="site-layout">{children}</div>
        </I18nProvider>
      </body>
    </html>
  )
}
