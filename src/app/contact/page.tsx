import Footer from '@/components/footer'
import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'
import Link from 'next/link'

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { sent?: string; error?: string }
}) {
  const locale = defaultLocale
  const copy = getCopy(locale)
  const isSent = searchParams?.sent === '1'
  const isError = searchParams?.error === '1'
  return (
    <main className="contactPage">
      <section className="contactSection">
        {!isSent && <h1 className="contactTitle">{copy.contact.title}</h1>}
        {isError && (
          <p className="contactStatus contactStatus--error">
            {copy.contact.errorMessage}
          </p>
        )}
        {isSent ? (
          <div className="contactSuccess">
            <div className="contactSuccess__icon" aria-hidden="true">
              <svg
                viewBox="0 0 64 64"
                width="96"
                height="96"
                role="img"
                aria-hidden="true"
                focusable="false"
              >
                <circle
                  className="contactSuccess__circle"
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#b7d8be"
                  strokeWidth="4"
                />
                <path
                  className="contactSuccess__check"
                  d="M19 33.5l8.5 8.5L45 24.5"
                  fill="none"
                  stroke="#1f6b2b"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="contactSuccess__title">{copy.contact.successTitle}</h2>
            <p className="contactSuccess__copy">{copy.contact.successSubcopy}</p>
            <div className="contactSuccess__actions">
              <Link className="contactSuccess__button" href="/">
                {copy.contact.backHome}
              </Link>
              <Link className="contactSuccess__link" href="/contact">
                {copy.contact.newMessage}
              </Link>
            </div>
          </div>
        ) : (
          <form className="contactForm" action="/api/contact" method="post">
            <div className="contactRow">
              <label className="contactField">
                <span className="contactLabel">
                  {copy.contact.firstNameLabel}
                </span>
                <input
                  className="contactInput"
                  type="text"
                  name="firstName"
                  placeholder={copy.contact.firstNamePlaceholder}
                />
              </label>
              <label className="contactField">
                <span className="contactLabel">
                  {copy.contact.lastNameLabel}
                </span>
                <input
                  className="contactInput"
                  type="text"
                  name="lastName"
                  placeholder={copy.contact.lastNamePlaceholder}
                />
              </label>
            </div>

            <label className="contactField">
              <span className="contactLabel">{copy.contact.emailLabel}</span>
              <input
                className="contactInput"
                type="email"
                name="email"
                placeholder={copy.contact.emailPlaceholder}
                required
              />
            </label>

            <label className="contactField">
              <textarea
                className="contactTextarea"
                name="message"
                rows={6}
                placeholder={copy.contact.messagePlaceholder}
                required
              />
            </label>

            <button className="contactButton" type="submit">
              {copy.contact.send}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </main>
  )
}
