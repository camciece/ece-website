'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Post() {
  const { t } = useTranslation()

  return (
    <main className="writingPage">
      <article className="writingArticle">
        <header className="writingHeader">
          <div className="writingArticle__tag">AI</div>
          <h1 className="writingArticle__title">
            How large language models actually work
          </h1>
          <div className="writingAuthor">
            <div className="writingAuthor__avatar" aria-hidden="true" />
            <div className="writingAuthor__info">
              <span>By Ece Çamcı</span>
              <span>Published on Monday, Jan 5, 2025</span>
            </div>
          </div>
        </header>
      </article>

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
              <Link href="/privacy">{t('footer.privacy')}</Link>
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
    </main>
  )
}
