import Footer from '@/components/footer'
import { defaultLocale } from '@/lib/locale'
import { getAllPosts } from '@/lib/md'
import Link from 'next/link'

export default async function Writing() {
  const locale = defaultLocale
  const writings = getAllPosts(locale)
  return (
    <main className="writingPage">
      <section className="simpleSection"></section>

      <section className="writingGrid writingGrid--list">
        <div className="writingGrid__rows">
          {writings.map((post) => (
            <Link
              key={post.slug}
              className="writingCard"
              href={`/writing/${post.slug}`}
            >
              <div className="writingCard__content">
                <div className="writingCard__rule" />
                <div className="writingCard__tag">{post.tags?.[0] ?? 'AI'}</div>
                <h3>{post.title}</h3>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
              </div>
              <img
                className="writingCard__media writingCard__media--one"
                src="/LLMs.png"
                alt="LLMs"
              />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
