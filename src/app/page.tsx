import Footer from '@/components/footer'
import { defaultLocale } from '@/lib/locale'
import { getAllPosts } from '@/lib/md'
import { getCopy } from '@/lib/static-copy'
import Link from 'next/link'

export default async function Home() {
  const locale = defaultLocale
  const [latest] = getAllPosts(locale)
  const copy = getCopy(locale)
  return (
    <main className="home">
      <section className="homeHeroBg">
        <div className="homeHeroFrame">
          <Link
            className="heroStage__card heroStage__card--link"
            href="/writing"
          >
            <h1>{copy.home.heroTitle}</h1>
            <p>{copy.home.heroBody}</p>
            <span className="heroStage__link">{copy.home.heroCta}</span>
          </Link>
        </div>
      </section>

      <section className="writingGrid writingGrid--featured">
        <div className="sectionHeader">
          <h2>{copy.home.latestTitle}</h2>
          <Link className="sectionLink" href="/writing">
            {copy.home.viewAll}
          </Link>
        </div>
        <div className="writingGrid__rows">
          {latest ? (
            <Link
              className="writingCard writingCard--featured writingCard--link"
              href={`/writing/${latest.slug}`}
            >
              <div className="writingCard__body">
                <div className="writingCard__content">
                  <div className="writingCard__rule" />
                  <div className="writingCard__tag">
                    {latest.tags?.[0] ?? 'AI'}
                  </div>
                  <h3>{latest.title}</h3>
                </div>
                {latest.excerpt ? (
                  <p className="writingCard__summary">{latest.excerpt}</p>
                ) : null}
              </div>
              <div className="writingCard__visual">
                <img
                  className="writingCard__media writingCard__media--one"
                  src="/LLMs.png"
                  alt="LLMs"
                />
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
}
