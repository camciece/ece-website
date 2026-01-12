'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import type { Locale } from '@/lib/locale'
import { withLocale } from '@/lib/locale'

export default function Footer({ locale }: { locale: Locale }) {
  const { t } = useTranslation()

  return (
    <section className="closingSection">
      <div className="closingPanel">
        <div className="closingNav">
          <Link href={withLocale('/writing', locale)}>
            {t('nav.writings')}
          </Link>
          <Link href={withLocale('/meet-ece', locale)}>
            {t('nav.meetEce')}
          </Link>
          <Link href={withLocale('/recommendations', locale)}>
            {t('nav.recommendations')}
          </Link>
          <Link href={withLocale('/heroes', locale)}>{t('nav.heroes')}</Link>
        </div>
        <div className="closingMeta">
          <div className="closingLinks">
            <Link href={withLocale('/privacy', locale)}>
              {t('footer.privacy')}
            </Link>
            <Link href={withLocale('/disclaimer', locale)}>
              {t('footer.disclaimer')}
            </Link>
            <Link href={withLocale('/contact', locale)}>
              {t('footer.contact')}
            </Link>
          </div>
          <div className="closingSocial">
            <a
              href="https://www.instagram.com/ececamci"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/ig.svg" alt="" />
            </a>
            <a
              href="https://www.youtube.com/@msececamci"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/yt.svg" alt="" />
            </a>
            <a
              href="https://www.linkedin.com/in/ececamci/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/ig.svg" alt="" />
            </a>
          </div>
          <div className="closingCopyright">
            {t('footer.copyright', { year: 2025 })}
          </div>
        </div>
      </div>
    </section>
  )
}
