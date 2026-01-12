import Footer from '@/components/footer'
import Link from 'next/link'

const writings = [
  {
    slug: 'how-llms-work',
    tag: 'AI',
    title: 'How large language models actually work',
    excerpt:
      'A clearer mental model for what’s really happening inside an LLM, from tokens and embeddings to attention and transformers.',

    mediaClass: 'writingCard__media--one',
  },
]

export default function Writing() {
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
                <div className="writingCard__tag">{post.tag}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
              <div className={`writingCard__media ${post.mediaClass}`} />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
