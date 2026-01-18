import Footer from '@/components/footer'
import type { Locale } from '@/lib/locale'
import { withLocale } from '@/lib/locale'
import { getAllPosts } from '@/lib/md'
import Link from 'next/link'

export default function Writing({ params }: { params: { locale: Locale } }) {
  const writings = getAllPosts(params.locale)
  return (
    <main className="writingPage">
      <section className="simpleSection"></section>

      <section className="writingGrid writingGrid--list">
        <div className="writingGrid__rows">
          {writings.map((post) => (
            <Link
              key={post.slug}
              className="writingCard"
              href={withLocale(`/writing/${post.slug}`, params.locale)}
            >
              <div className="writingCard__content">
                <div className="writingCard__rule" />
                <div className="writingCard__tag">{post.tags?.[0] ?? 'AI'}</div>
                <h3>{post.title}</h3>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
              </div>
              <div className="writingCard__media writingCard__media--one" />
            </Link>
          ))}
        </div>
      </section>

      <Footer locale={params.locale} />
    </main>
  )
}
