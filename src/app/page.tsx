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
                <div className="writingCard__tag">AI</div>
                <h3>Notes on how large language models (LLMs) work</h3>
              </div>
              <p className="writingCard__summary">
                Most explanations of LLMs stop at “it’s magic.” This piece goes
                a level deeper and clearly walks through how large language
                models actually work, from tokens and embeddings to attention
                and transformers. By grounding abstract concepts in concrete
                examples, this reading builds real intuition for what’s
                happening inside the model.
              </p>
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
