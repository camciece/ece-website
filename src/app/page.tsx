import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">
      <section className="homeHeroBg">
        <div className="heroStage__card">
          <div className="heroStage__eyebrow">Seasonal readings</div>
          <h1>Five books to read this winter</h1>
          <p>
            These were some of my favorite books from 2025 - concise, thoughtful
            picks for the season ahead.
          </p>
          <Link className="heroStage__link" href="/writing">
            Read the picks
          </Link>
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
            <div>
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
            <div>
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
            <div>
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

      <section className="homeSplit">
        <div className="homeEssay">
          <div className="homeEssay__label">Featured series</div>
          <h3>Shipping AI with clear constraints</h3>
          <p>
            A four-part series on budgets, latency tradeoffs, and the decisions
            that keep AI products reliable in the wild.
          </p>
          <Link className="homeEssay__link" href="/writing">
            Explore the series
          </Link>
        </div>
        <div className="homeNotes">
          <div className="homeNotes__header">Notes and links</div>
          <div className="homeNotes__item">
            <div className="homeNotes__title">
              The checklist I use before every launch
            </div>
            <div className="homeNotes__meta">2 min read</div>
          </div>
          <div className="homeNotes__item">
            <div className="homeNotes__title">
              Partner marketing that feels like product
            </div>
            <div className="homeNotes__meta">3 min read</div>
          </div>
          <div className="homeNotes__item">
            <div className="homeNotes__title">
              What I learned building AI demos that turned into products
            </div>
            <div className="homeNotes__meta">5 min read</div>
          </div>
        </div>
      </section>
    </main>
  )
}
