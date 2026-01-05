import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">
      <section className="homeHeroBg">
        <div className="homeHeroFrame">
          <Link
            className="heroStage__card heroStage__card--link"
            href="/writing"
          >
            <h1>Notes from building with AI</h1>
            <p>
              Early thoughts, experiments, and lessons from building with AI -
              written as I learn, not after everything is figured out.
            </p>
            <span className="heroStage__link">Start reading</span>
          </Link>
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
          <Link
            className="writingCard writingCard--featured writingCard--link"
            href="/writing/remarkably-bright-creatures"
          >
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
          </Link>
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
