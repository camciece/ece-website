import Footer from '@/components/footer'
import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const copy = getCopy(params.locale)
  return (
    <main className="disclaimerPage">
      <section className="disclaimerShell">
        <header className="disclaimerHeader">
          <p className="disclaimerEyebrow">{copy.privacy.eyebrow}</p>
          <h1 className="disclaimerTitle">{copy.privacy.title}</h1>
        </header>

        <div className="disclaimerMeta">
          <div className="disclaimerAvatar" aria-hidden>
            EC
          </div>
          <p className="disclaimerByline">
            <span>{copy.privacy.bylineName}</span>{' '}
            {copy.privacy.publishedOnPrefix}
            <span>{copy.privacy.bylineDate}</span>
            {copy.privacy.publishedOnSuffix}
          </p>
        </div>

        <article className="disclaimerBody">
          <p>{copy.privacy.lastUpdated}</p>
          <h2 className="disclaimerHeading">{copy.privacy.headingPrivacy}</h2>
          {copy.privacy.privacyIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2 className="disclaimerHeading">
            {copy.privacy.headingCollected}
          </h2>
          <ul className="privacyList">
            {copy.privacy.collected.map((item) => (
              <li key={item.title}>
                <div className="privacyListItem">
                  <h3>{item.title}</h3>
                  {item.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <h2 className="disclaimerHeading">
            {copy.privacy.headingNotCollected}
          </h2>
          <ul className="privacyList privacyList--compact">
            {copy.privacy.notCollected.map((item) => (
              <li key={item}>
                <div className="privacyListItem">{item}</div>
              </li>
            ))}
          </ul>
          <p>{copy.privacy.closing}</p>
        </article>
      </section>
      <Footer locale={params.locale} />
    </main>
  )
}
