export default function ContactPage() {
  return (
    <main className="contactPage">
      <section className="contactSection">
        <h1 className="contactTitle">Contact Me</h1>
        <form className="contactForm">
          <div className="contactRow">
            <label className="contactField">
              <span className="contactLabel">First name</span>
              <input
                className="contactInput"
                type="text"
                name="firstName"
                placeholder="First name"
              />
            </label>
            <label className="contactField">
              <span className="contactLabel">Last name</span>
              <input
                className="contactInput"
                type="text"
                name="lastName"
                placeholder="Last name"
              />
            </label>
          </div>

          <label className="contactField">
            <span className="contactLabel">Your email</span>
            <input
              className="contactInput"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </label>

          <label className="contactField">
            <textarea
              className="contactTextarea"
              name="message"
              rows={6}
              placeholder="Send me your questions and feedback"
            />
          </label>

          <button className="contactButton" type="submit">
            Send
          </button>
        </form>
      </section>
    </main>
  )
}
