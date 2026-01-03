export default function DisclaimerPage() {
  return (
    <main className="disclaimerPage">
      <section className="disclaimerShell">
        <header className="disclaimerHeader">
          <p className="disclaimerEyebrow">Eces Notes Website</p>
          <h1 className="disclaimerTitle">Disclaimer</h1>
        </header>

        <div className="disclaimerMeta">
          <div className="disclaimerAvatar" aria-hidden>
            EC
          </div>
          <p className="disclaimerByline">
            <span>By Ece Camci</span> published on{' '}
            <span>Tuesday, Nov 24, 2015</span>
          </p>
        </div>

        <article className="disclaimerBody">
          <p>
            The content on this website reflects my personal views and
            experiences. All writing here is for informational and educational
            purposes only.
          </p>
          <h2 className="disclaimerHeading">Not professional advice</h2>
          <p>Nothing on this site should be considered:</p>
          <ul className="disclaimerList">
            <li>legal advice</li>
            <li>financial advice</li>
            <li>medical advice</li>
            <li>or a substitute for professional consultation</li>
          </ul>
          <p>
            Any decisions you make based on the content are your own
            responsibility.
          </p>
          <h2 className="disclaimerHeading">Accuracy and updates</h2>
          <p>
            I aim to be thoughtful and accurate, but information may change over
            time. Some posts reflect opinions at a specific moment. I reserve
            the right to update or revise content as my thinking evolves.
          </p>
          <h2 className="disclaimerHeading">Intellectual property</h2>
          <p>
            Unless stated otherwise, all content on this site is my original
            work. You are welcome to quote short excerpts with proper
            attribution. Please do not reproduce full articles without
            permission.
          </p>
          <h2 className="disclaimerHeading">Contact</h2>
          <p>
            If you have questions about the content or its use, feel free to
            reach out:{' '}
            <a className="disclaimerEmail" href="mailto:camciece@gmail.com">
              hello@ececamci.com <span aria-hidden>↗</span>
            </a>
          </p>
        </article>
      </section>
    </main>
  )
}
