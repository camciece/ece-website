import Footer from '@/components/footer'
import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function ContactPage() {
  const locale = defaultLocale
  const copy = getCopy(locale)
  return (
    <main className="contactPage">
      <section className="contactSection">
        <h1 className="contactTitle">{copy.contact.title}</h1>
        <form className="contactForm">
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
              <span className="contactLabel">{copy.contact.lastNameLabel}</span>
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
            />
          </label>

          <label className="contactField">
            <textarea
              className="contactTextarea"
              name="message"
              rows={6}
              placeholder={copy.contact.messagePlaceholder}
            />
          </label>

          <button className="contactButton" type="submit">
            {copy.contact.send}
          </button>
        </form>
      </section>
      <Footer />
    </main>
  )
}
