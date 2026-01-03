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

      <section className="writingGrid">
        <div className="sectionHeader">
          <h2>Latest writing</h2>
          <Link className="sectionLink" href="/writing">
            View all
          </Link>
        </div>
        <div className="writingGrid__rows">
          <article className="writingCard">
            <div className="writingCard__content">
              <div className="writingCard__rule" />
              <div className="writingCard__tag">Under the sea</div>
              <h3>Growing older with Remarkably Bright Creatures</h3>
              <p>
                Shelby Van Pelt’s novel was the perfect way to start my next
                decade of life.
              </p>
            </div>

            <div className="writingCard__media writingCard__media--one" />
          </article>
          <article className="writingCard">
            <div className="writingCard__content">
              <div className="writingCard__rule" />
              <div className="writingCard__tag">Goes without saying</div>
              <h3>Lessons from a toilet paper shortage</h3>
              <p>
                Steven Pinker’s latest book explores the fascinating science
                behind common...
              </p>
            </div>

            <div className="writingCard__media writingCard__media--two" />
          </article>
          <article className="writingCard">
            <div className="writingCard__content">
              <div className="writingCard__rule" />
              <div className="writingCard__tag">Diller instinct</div>
              <h3>The man who built modern media</h3>
              <p>
                Barry Diller’s memoir is a candid playbook for creativity and
                competition in business.
              </p>
            </div>

            <div className="writingCard__media writingCard__media--three" />
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
