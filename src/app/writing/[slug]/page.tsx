import Link from 'next/link'

export default async function Post() {
  return (
    <main className="writingPage">
      <section className="writingHero">
        <div className="writingHeroFrame" />
      </section>

      <article className="writingArticle">
        <div className="writingArticle__tag">Under the sea</div>
        <h1 className="writingArticle__title">
          Growing older with Remarkably Bright Creatures
        </h1>
        <p className="writingArticle__deck">
          Shelby Van Pelt’s novel was the perfect way to start my next decade of
          life.
        </p>
        <div className="writingAuthor">
          <div className="writingAuthor__avatar" aria-hidden="true" />
          <div className="writingAuthor__info">
            <span>By Ece Camci</span>
            <span>Published on Tuesday, Nov 25, 2025</span>
          </div>
        </div>

        <div className="writingBody">
          <p>
            I turned 70 years old last month. I don’t feel like it, though. I
            still have a ton of energy, and I have no plans to retire. But
            somehow, I have officially reached an age my younger self would have
            called “old.” It’s hard to wrap my head around.
          </p>
          <p>
            Fortunately, I recently read Remarkably Bright Creatures, a terrific
            novel that helped me make a bit more sense out of aging. Shelby Van
            Pelt released her debut novel a couple years ago. It was a huge hit,
            and I think I might be one of the last people to read it—but I’m
            glad I waited until now.
          </p>
          <p>
            Marcellus is a fascinating character. Octopuses are some of the
            smartest animals in the world, and although Marcellus can’t speak,
            he is super observant. Van Pelt cleverly includes chapters from his
            perspective, so you get to learn about how he sees the world.
          </p>
        </div>
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
