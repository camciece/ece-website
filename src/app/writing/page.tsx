import Footer from '@/components/footer'
import {
  POST_CATEGORIES,
  POST_TAGS,
  buildWritingHref,
  getAllPosts,
  isPostCategory,
  isPostTag,
} from '@/lib/md'
import { getRequestLocale } from '@/lib/server-locale'
import { getCategoryLabel, getCopy, getTagLabel } from '@/lib/static-copy'
import Link from 'next/link'

export default async function Writing({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; tag?: string | string[] }>
}) {
  const locale = await getRequestLocale()
  const copy = getCopy(locale)
  const writings = getAllPosts(locale)
  const resolvedSearchParams = await searchParams
  const activeCategory = isPostCategory(resolvedSearchParams?.category)
    ? resolvedSearchParams.category
    : undefined
  const activeTags = (
    Array.isArray(resolvedSearchParams?.tag)
      ? resolvedSearchParams.tag
      : resolvedSearchParams?.tag
        ? [resolvedSearchParams.tag]
        : []
  ).filter(isPostTag)
  const visibleWritings = writings.filter((post) => {
    if (activeCategory && post.category !== activeCategory) return false
    if (activeTags.length > 0 && !post.tags.some((tag) => activeTags.includes(tag)))
      return false
    return true
  })
  const showTagFilters = !activeCategory || activeCategory === 'ai-series'

  return (
    <main className="writingPage">
      <section className="simpleSection"></section>

      <section className="writingGrid writingGrid--list">
        <div className="writingFilters">
          <Link
            href={buildWritingHref(undefined, activeTags)}
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
              href={buildWritingHref(category, activeTags)}
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
        {showTagFilters ? (
          <div className="writingFilters writingFilters--tags">
            {POST_TAGS.map((tag) => {
              const isActive = activeTags.includes(tag)
              const nextTags = isActive
                ? activeTags.filter((t) => t !== tag)
                : [...activeTags, tag]
              return (
                <Link
                  key={tag}
                  href={buildWritingHref(activeCategory, nextTags)}
                  className={
                    isActive
                      ? 'writingFilters__pill writingFilters__pill--tag writingFilters__pill--active'
                      : 'writingFilters__pill writingFilters__pill--tag'
                  }
                >
                  {getTagLabel(locale, tag)}
                </Link>
              )
            })}
          </div>
        ) : null}
        <div className="writingGrid__rows">
          {visibleWritings.map((post) => (
            <article key={post.slug} className="writingCard">
              <div className="writingCard__content">
                <div className="writingCard__rule" />
                <div className="writingCard__metaRow">
                  <Link
                    href={buildWritingHref(post.category)}
                    className="writingCard__tag writingCard__tag--link"
                  >
                    {getCategoryLabel(locale, post.category)}
                  </Link>
                  {post.tags.length > 0 ? (
                    <div className="writingCard__tags">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={buildWritingHref(undefined, [tag])}
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
                <img
                  className="writingCard__media writingCard__media--one"
                  src={post.image}
                  alt=""
                />
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
