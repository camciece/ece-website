import Footer from '@/components/footer'
import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'
import Link from 'next/link'

const topicHrefs = ['/writing', '/recommendations', '/heroes'] as const

export default async function MeetEcePage() {
  const locale = defaultLocale
  const copy = getCopy(locale)
  return (
    <main className="meetPage">
      <section className="homeHeroBg meetHeroBg">
        <div className="meetHeroFrame">
          <div className="meetHeroMedia">
            <p className="meetHeroTitle">{copy.meet.heroTitle}</p>
          </div>
        </div>
      </section>

      <section className="meetSection meetSection--intro">
        <div className="meetSectionFrame">
          {copy.meet.intro.map((paragraph) => (
            <p key={paragraph} className="meetStatement">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="meetSection meetSection--topics">
        <div className="meetSectionFrame">
          <div className="meetSectionHeader">
            <h2 className="meetSectionTitle">{copy.meet.topicsTitle}</h2>
          </div>
          <div className="meetTopics__grid">
            {copy.meet.topics.map((topic, index) => (
              <Link
                key={topic.title}
                className="meetTopics__card"
                href={topicHrefs[index]}
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
            <h2 className="meetSectionTitle">{copy.meet.beyondTitle}</h2>
          </div>
          <p className="meetSectionNote">{copy.meet.beyondNote}</p>

          <Link
            className="meetSectionLink"
            href="https://www.instagram.com/ececamci"
            target="_blank"
            rel="noreferrer"
          >
            {copy.meet.instagramCta}
          </Link>

          <p className="meetSectionNote">{copy.meet.linkedInNote}</p>

          <Link
            className="meetSectionLink"
            href="https://www.linkedin.com/in/ececamci"
            target="_blank"
            rel="noreferrer"
          >
            {copy.meet.linkedInCta}
          </Link>
        </div>
      </section>

      <section className="meetSection meetSection--note">
        <div className="meetSectionFrame">
          <div className="meetSectionHeader">
            <h2 className="meetSectionTitle">{copy.meet.noteTitle}</h2>
          </div>
          <p className="meetSectionNote">
            {copy.meet.noteBodyPrefix}{' '}
            <Link href="https://vercel.com/" target="_blank" rel="noreferrer">
              Vercel
            </Link>
            {copy.meet.noteBodySuffix}
          </p>
          <Link
            className="meetSectionLink"
            href="https://github.com/camciece/ece-website"
            target="_blank"
            rel="noreferrer"
          >
            {copy.meet.sourceCta}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
