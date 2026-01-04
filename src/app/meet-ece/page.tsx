import Link from 'next/link'

const albumItems = [
  {
    note: 'Three micro-meltdowns, one unstoppable laugh with the nieces.',
    meta: 'Saturday kitchen chaos',
    toneClass: 'meetAlbum__photo--one',
  },
  {
    note: 'We said "no work talk," then... work talk.',
    meta: 'Istanbul, late lunch',
    toneClass: 'meetAlbum__photo--two',
  },
  {
    note: "Dad's favorite corner, his quiet rule: tea first.",
    meta: 'Family home',
    toneClass: 'meetAlbum__photo--three',
  },
  {
    note: 'A chaotic, warm table that somehow feeds everyone.',
    meta: 'Sunday dinner',
    toneClass: 'meetAlbum__photo--four',
  },
  {
    note: 'Best friend, worst playlist, perfect night.',
    meta: 'Road trip',
    toneClass: 'meetAlbum__photo--five',
  },
  {
    note: "Mom's laugh travels faster than any Wi-Fi.",
    meta: 'Garden break',
    toneClass: 'meetAlbum__photo--six',
  },
  {
    note: 'Group photo attempt #6 -- we kept the fail.',
    meta: 'After a tiny hike',
    toneClass: 'meetAlbum__photo--seven',
  },
  {
    note: 'Someone always brings dessert. Someone else brings drama.',
    meta: 'Friends night',
    toneClass: 'meetAlbum__photo--eight',
  },
]

const topics = [
  {
    title: 'AI Series',
    copy: 'The practical edges of building with AI.',
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

      <section className="meetSection meetSection--album">
        <div className="meetSectionFrame meetAlbum__frame">
          <div className="meetSectionHeader">
            <h2 className="meetSectionTitle">
              This is what keeps me sane while I obsess over AI, products, and
              why things still don’t work.
            </h2>
          </div>
          <div className="meetAlbum__grid">
            {albumItems.map((item) => (
              <div key={item.note} className="meetAlbum__card">
                <div className={`meetAlbum__photo ${item.toneClass}`} />
                <p className="meetAlbum__note">{item.note}</p>
                <span className="meetAlbum__meta">{item.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="meetSection meetSection--topics">
        <div className="meetSectionFrame meetSectionFrame--overlap">
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
