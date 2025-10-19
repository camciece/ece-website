import { getAllPosts } from "@/lib/md";
import Link from "next/link";

export default function Home() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="hero">
        <div>
          <div className="kicker">AI • Product • Partner Marketing</div>
          <h1>
            Ece Çamcı — building impactful AI stories & shipping what matters
          </h1>
          <p className="lead">
            I help teams turn AI from demos into{" "}
            <strong>reliable products</strong>. Writing on distributed cloud,
            cost-aware LLMs, and GTM that resonates.
          </p>
          <div className="cta-row">
            <Link className="btn primary" href="/writing">
              Read the blog
            </Link>
            <Link className="btn" href="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2>Latest writing</h2>
        <div className="post-list">
          {latest.map((p) => (
            <article key={p.slug} className="post-item">
              <Link href={`/writing/${p.slug}`}>{p.title}</Link>
              <div className="meta">
                {new Date(p.date).toLocaleDateString()} •{" "}
                {p.readingTime ?? "4 min"}
              </div>
              {p.excerpt && <p>{p.excerpt}</p>}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Focus areas</h2>
        <div className="grid">
          <div className="card">
            <strong>AI in production</strong>
            <br />
            <span className="meta">
              Guardrails, evals, cost & latency budgets
            </span>
          </div>
          <div className="card">
            <strong>Distributed Cloud</strong>
            <br />
            <span className="meta">Sovereign architectures & partner GTM</span>
          </div>
          <div className="card">
            <strong>Product & Story</strong>
            <br />
            <span className="meta">Narratives that move buyers (EN/TR)</span>
          </div>
        </div>
      </section>
    </>
  );
}
