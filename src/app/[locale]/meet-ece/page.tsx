import Footer from '@/components/footer'
import type { Locale } from '@/lib/locale'
import { withLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'
import Link from 'next/link'

const topicHrefs = ['/writing', '/recommendations', '/heroes'] as const

export default function MeetEcePage({
  params,
}: {
  params: { locale: Locale }
}) {
  const copy = getCopy(params.locale)
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
          <p className="meetStatement">{copy.meet.intro}</p>
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
                href={withLocale(topicHrefs[index], params.locale)}
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
              {copy.meet.beyondTitle}
            </h2>
          </div>
          <p className="meetSectionNote">
            {copy.meet.beyondNote}
          </p>

          <Link
            className="meetSectionLink"
            href="https://www.instagram.com/ececamci"
            target="_blank"
            rel="noreferrer"
          >
            {copy.meet.instagramCta}
          </Link>

          <p className="meetSectionNote">
            {copy.meet.linkedInNote}
          </p>

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
          <p className="meetSectionNote meetSectionNote--small">
            {copy.meet.noteSmall}
          </p>
        </div>
      </section>

      <Footer locale={params.locale} />
    </main>
  )
}
