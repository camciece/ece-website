export default function PrivacyPage() {
  return (
    <main className="disclaimerPage">
      <section className="disclaimerShell">
        <header className="disclaimerHeader">
          <p className="disclaimerEyebrow">Eces Notes Website</p>
          <h1 className="disclaimerTitle">Privacy Policy</h1>
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
          <p>Last updated: January 2026</p>
          <h2 className="disclaimerHeading">Privacy</h2>
          <p>This is a personal website and writing space.</p>
          <p>
            I value privacy, including my own and yours. This page explains, in
            plain terms, what data (if any) is collected when you visit this
            site.
          </p>
          <h2 className="disclaimerHeading">What information is collected</h2>
          <ul className="privacyList">
            <li>
              <div className="privacyListItem">
                <h3>Anonymous usage data</h3>
                <p>
                  Like most websites, basic, aggregated traffic data may be
                  collected (for example, page views or general location such as
                  country).
                </p>
                <p>
                  This data is used only to understand how the site is used and
                  to improve it.
                </p>
              </div>
            </li>
            <li>
              <div className="privacyListItem">
                <h3>Email communication</h3>
                <p>
                  If you choose to contact me via email, I will receive your
                  email address and the information you share voluntarily.
                </p>
              </div>
            </li>
          </ul>
          <h2 className="disclaimerHeading">What is not collected</h2>
          <ul className="privacyList privacyList--compact">
            <li>
              <div className="privacyListItem">No personal profiles</div>
            </li>
            <li>
              <div className="privacyListItem">
                No tracking across other websites
              </div>
            </li>
            <li>
              <div className="privacyListItem">
                No sale or sharing of personal data
              </div>
            </li>
            <li>
              <div className="privacyListItem">No targeted advertising</div>
            </li>
          </ul>
          <p>
            If analytics are used, they are lightweight and privacy-respecting.
          </p>
        </article>
      </section>
    </main>
  )
}
