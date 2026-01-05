import Link from 'next/link'

const topics = [
  {
    title: 'AI Series',
    copy: 'The useful edges of building with AI.',
    href: '/writing',
  },
  {
    title: 'Recommendations',
    copy: 'Books, tools, and things I keep around.',
    href: '/recommendations',
  },
  {
    title: 'Heroes',
    copy: 'People who push me to think wider.',
    href: '/heroes',
  },
]

export default function MeetEcePage() {
  return (
    <main className="meetPage">
      <section className="homeHeroBg meetHeroBg">
        <div className="meetHeroFrame">
          <div className="meetHeroMedia">
            <p className="meetHeroTitle">Meet Ece</p>
          </div>
        </div>
      </section>

      <section className="meetSection meetSection--intro">
        <div className="meetSectionFrame">
          <p className="meetStatement">
            I work in tech and I’m currently carving my own path within it. I
            love experimenting with AI tools, and somewhere along the way, that
            curiosity turned into building this website through a bit of vibe
            coding. Writing helps me think, learn, and actually digest what I’m
            building, so I share what I learn as I go.
          </p>
        </div>
      </section>

      <section className="meetSection meetSection--topics">
        <div className="meetSectionFrame">
          <div className="meetSectionHeader">
            <h2 className="meetSectionTitle">What I write about</h2>
          </div>
          <div className="meetTopics__grid">
            {topics.map((topic) => (
              <Link
                key={topic.title}
                className="meetTopics__card"
                href={topic.href}
              >
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="meetSection meetSection--beyond">
        <div className="meetSectionFrame">
          <div className="meetSectionHeader">
            <h2 className="meetSectionTitle">
              Beyond writing / Outside this page
            </h2>
          </div>
          <p className="meetSectionNote">
            This site is mostly about how I think and what I build. If
            you&apos;re curious about the more human, unfiltered side - everyday
            moments, side thoughts, and life in between - I share those over on
            Instagram.
          </p>

          <Link
            className="meetSectionLink"
            href="https://www.instagram.com/ececamci"
            target="_blank"
            rel="noreferrer"
          >
            Follow me on Instagram
          </Link>

          <p className="meetSectionNote">
            For more professional conversations, work updates, and
            collaborations, I’m also on LinkedIn.
          </p>

          <Link
            className="meetSectionLink"
            href="https://www.linkedin.com/in/ececamci"
            target="_blank"
            rel="noreferrer"
          >
            Connect me on Linkedin
          </Link>
        </div>
      </section>

      <section className="meetSection meetSection--note">
        <div className="meetSectionFrame">
          <div className="meetSectionHeader">
            <h2 className="meetSectionTitle">A small note</h2>
          </div>
          <p className="meetSectionNote">
            This website started as a side project: built while experimenting
            with AI tools, learning by doing, and occasionally breaking things
            along the way. It’s built with a simple setup and hosted on{' '}
            <Link href="https://vercel.com/" target="_blank" rel="noreferrer">
              Vercel
            </Link>
            . I decided to open-source it in case it’s useful (or at least
            reassuring) for others building their own small corners on the
            internet.
          </p>
          <Link
            className="meetSectionLink"
            href="https://github.com/camciece/ece-website"
            target="_blank"
            rel="noreferrer"
          >
            View the source code on GitHub
          </Link>
          <p className="meetSectionNote meetSectionNote--small">
            Feel free to explore, fork, or borrow ideas.
          </p>
        </div>
      </section>

      <section className="closingSection closingSection--meet">
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
