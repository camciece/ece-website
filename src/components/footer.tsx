'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <section className="closingSection">
      <div className="closingPanel">
        <div className="closingNav">
          <Link href="/writing">{t('nav.writings')}</Link>
          <Link href="/meet-ece">{t('nav.meetEce')}</Link>
          <Link href="/recommendations">{t('nav.recommendations')}</Link>
          <Link href="/heroes">{t('nav.heroes')}</Link>
        </div>
        <div className="closingMeta">
          <div className="closingLinks">
            <Link href="/disclaimer">{t('footer.disclaimer')}</Link>
            <Link href="/contact">{t('footer.contact')}</Link>
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
              <img src="/in.svg" alt="" />
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
