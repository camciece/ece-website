'use client'

import Footer from '@/components/footer'
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

      <Footer />
    </main>
  )
}
