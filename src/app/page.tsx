import Footer from '@/components/footer'
import { buildWritingHref, getAllPosts } from '@/lib/md'
import { getRequestLocale } from '@/lib/server-locale'
import { getCopy, getTagLabel } from '@/lib/static-copy'
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
            <article key={post.slug} className="writingCard writingCard--home">
              <div className="writingCard__content">
                <div className="writingCard__rule" />
                <div className="writingCard__metaRow">
                  {post.tags.length > 0 ? (
                    <div className="writingCard__tags">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={buildWritingHref([tag])}
                          className="writingCard__tagChip writingCard__tagChip--link"
                        >
                          {getTagLabel(locale, tag)}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
                <h3>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="writingCard__titleLink"
                  >
                    {post.title}
                  </Link>
                </h3>
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
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
