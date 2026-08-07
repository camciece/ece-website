import Footer from '@/components/footer'
import { POST_CATEGORIES, getAllPosts, isPostCategory } from '@/lib/md'
import { getRequestLocale } from '@/lib/server-locale'
import { getCategoryLabel, getCopy } from '@/lib/static-copy'
import Link from 'next/link'

export default async function Writing({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const locale = await getRequestLocale()
  const copy = getCopy(locale)
  const writings = getAllPosts(locale)
  const resolvedSearchParams = await searchParams
  const activeCategory = isPostCategory(resolvedSearchParams?.category)
    ? resolvedSearchParams.category
    : undefined
  const visibleWritings = activeCategory
    ? writings.filter((post) => post.category === activeCategory)
    : writings

  return (
    <main className="writingPage">
      <section className="simpleSection"></section>

      <section className="writingGrid writingGrid--list">
        <div className="writingFilters">
          <Link
            href="/writing"
            className={
              activeCategory
                ? 'writingFilters__pill'
                : 'writingFilters__pill writingFilters__pill--active'
            }
          >
            {copy.writing.filterAll}
          </Link>
          {POST_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/writing?category=${category}`}
              className={
                activeCategory === category
                  ? 'writingFilters__pill writingFilters__pill--active'
                  : 'writingFilters__pill'
              }
            >
              {getCategoryLabel(locale, category)}
            </Link>
          ))}
        </div>
        <div className="writingGrid__rows">
          {visibleWritings.map((post) => (
            <Link
              key={post.slug}
              className="writingCard"
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
                <img
                  className="writingCard__media writingCard__media--one"
                  src={post.image}
                  alt=""
                />
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
