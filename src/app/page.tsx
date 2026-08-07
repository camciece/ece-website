import Footer from '@/components/footer'
import { getAllPosts } from '@/lib/md'
import { getRequestLocale } from '@/lib/server-locale'
import { getCategoryLabel, getCopy } from '@/lib/static-copy'
import Link from 'next/link'

export default async function Home() {
  const locale = await getRequestLocale()
  const latestPosts = getAllPosts(locale).slice(0, 3)
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

      <section className="writingGrid writingGrid--home">
        <div className="sectionHeader">
          <h2>{copy.home.latestTitle}</h2>
          <Link className="sectionLink" href="/writing">
            {copy.home.viewAll}
          </Link>
        </div>
        <div className="writingGrid__rows">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              className="writingCard writingCard--home writingCard--link"
              href={`/writing/${post.slug}`}
            >
              <div className="writingCard__content">
                <div className="writingCard__rule" />
                <div className="writingCard__tag">
                  {getCategoryLabel(locale, post.category)}
                </div>
                <h3>{post.title}</h3>
                {post.excerpt ? (
                  <p className="writingCard__summary">{post.excerpt}</p>
                ) : null}
              </div>
              {post.image ? (
                <div className="writingCard__visual">
                  <img
                    className="writingCard__media writingCard__media--one"
                    src={post.image}
                    alt=""
                  />
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
