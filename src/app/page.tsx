import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">
      <section className="homeHeroBg">
        <div className="homeHeroFrame">
          <div className="heroStage__card">
            <div className="heroStage__eyebrow">Seasonal readings</div>
            <h1>Five books to read this winter</h1>
            <p>
              These were some of my favorite books from 2025 - concise,
              thoughtful picks for the season ahead.
            </p>
            <Link className="heroStage__link" href="/writing">
              Read the picks
            </Link>
          </div>
        </div>
      </section>

      <section className="writingGrid writingGrid--featured">
        <div className="sectionHeader">
          <h2>Latest writing</h2>
          <Link className="sectionLink" href="/writing">
            View all
          </Link>
        </div>
        <div className="writingGrid__rows">
          <article className="writingCard writingCard--featured">
            <div className="writingCard__body">
              <div className="writingCard__content">
                <div className="writingCard__rule" />
                <div className="writingCard__tag">Under the sea</div>
                <h3>Growing older with Remarkably Bright Creatures</h3>
                <p>
                  Shelby Van Pelt’s novel was the perfect way to start my next
                  decade of life.
                </p>
              </div>
              <p className="writingCard__summary">
                A warm, layered reflection on aging, tenderness, and the quiet
                friendships that pull us back to ourselves.
              </p>
              <ul className="writingCard__highlights">
                <li>What the octopus chapters reveal about empathy</li>
                <li>How grief reshapes identity in small, daily ways</li>
                <li>Favorite lines to re-read when life feels loud</li>
              </ul>
            </div>
            <div className="writingCard__visual">
              <div className="writingCard__media writingCard__media--one" />
            </div>
          </article>
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
