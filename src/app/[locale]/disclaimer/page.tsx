import Footer from '@/components/footer'
import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default function DisclaimerPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const copy = getCopy(params.locale)
  return (
    <main className="disclaimerPage">
      <section className="disclaimerShell">
        <header className="disclaimerHeader">
          <p className="disclaimerEyebrow">{copy.disclaimer.eyebrow}</p>
          <h1 className="disclaimerTitle">{copy.disclaimer.title}</h1>
        </header>

        <div className="disclaimerMeta">
          <div className="disclaimerAvatar" aria-hidden>
            EC
          </div>
          <p className="disclaimerByline">
            <span>{copy.disclaimer.bylineName}</span>{' '}
            {copy.disclaimer.publishedOnPrefix}
            <span>{copy.disclaimer.bylineDate}</span>
            {copy.disclaimer.publishedOnSuffix}
          </p>
        </div>

        <article className="disclaimerBody">
          <p>{copy.disclaimer.intro}</p>
          <h2 className="disclaimerHeading">
            {copy.disclaimer.headingNotProfessional}
          </h2>
          <p>{copy.disclaimer.notProfessionalLead}</p>
          <ul className="disclaimerList">
            {copy.disclaimer.notProfessionalItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{copy.disclaimer.responsibility}</p>
          <h2 className="disclaimerHeading">
            {copy.disclaimer.headingAccuracy}
          </h2>
          <p>{copy.disclaimer.accuracy}</p>
          <h2 className="disclaimerHeading">{copy.disclaimer.headingIP}</h2>
          <p>{copy.disclaimer.intellectualProperty}</p>
          <h2 className="disclaimerHeading">
            {copy.disclaimer.headingContact}
          </h2>
          <p>
            {copy.disclaimer.contactLead}{' '}
            <a className="disclaimerEmail" href="mailto:camciece@gmail.com">
              hello@ececamci.com <span aria-hidden>↗</span>
            </a>
          </p>
        </article>
      </section>
      <Footer locale={params.locale} />
    </main>
  )
}
