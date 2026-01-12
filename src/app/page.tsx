import Footer from '@/components/footer'
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
            <h1>Hello World!</h1>
            <p>
              This is a new tech blog where I document observations and
              experiments from working with AI. The focus is on what I’m
              learning along the way.
            </p>
            <span className="heroStage__link">Read the first post</span>
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
                <div className="writingCard__tag">AI</div>
                <h3>How large language models actullay work</h3>
              </div>
              <p className="writingCard__summary">
                Large language models often feel opaque and almost magical. This
                piece breaks down how they actually work (from text to numbers,
                from context to prediction) and why that architecture explains
                both their strengths and their limits.
              </p>
            </div>
            <div className="writingCard__visual">
              <div className="writingCard__media writingCard__media--one" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
