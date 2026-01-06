import Link from 'next/link'

export default async function Post() {
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
