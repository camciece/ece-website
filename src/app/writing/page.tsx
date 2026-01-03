import Link from 'next/link'

const writings = [
  {
    slug: 'remarkably-bright-creatures',
    tag: 'Under the sea',
    title: 'Growing older with Remarkably Bright Creatures',
    excerpt:
      'Shelby Van Pelt’s novel was the perfect way to start my next decade of life.',
    mediaClass: 'writingCard__media--one',
  },
  {
    slug: 'toilet-paper-shortage',
    tag: 'Goes without saying',
    title: 'Lessons from a toilet paper shortage',
    excerpt:
      'Steven Pinker’s latest book explores the fascinating science behind common...',
    mediaClass: 'writingCard__media--two',
  },
  {
    slug: 'barry-diller',
    tag: 'Diller instinct',
    title: 'The man who built modern media',
    excerpt:
      'Barry Diller’s memoir is a candid playbook for creativity and competition in business.',
    mediaClass: 'writingCard__media--three',
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

      <section className="closingSection">
        <div className="closingPanel">
          <div className="closingNav">
            <Link href="/writing">Writings</Link>
            <Link href="/meet-ece">Meet Ece</Link>
            <Link href="/recommendations">Recommendations</Link>
            <Link href="/heroes">Heroes</Link>
          </div>
          <div className="closingMeta">
            <div className="closingLinks">
              <Link href="/privacy">Privacy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              <Link href="/contact">Contact me</Link>
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
            <div className="closingCopyright">© 2025 Eces Notes</div>
          </div>
        </div>
      </section>
    </main>
  )
}
