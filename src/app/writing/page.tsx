import { getAllPosts } from "@/lib/md";
import Link from "next/link";

export default function Writing() {
  const posts = getAllPosts();
  return (
    <section>
      <h2>Writing</h2>
      <div className="post-list">
        {posts.map((p) => (
          <article key={p.slug} className="post-item">
            <Link href={`/writing/${p.slug}`}>{p.title}</Link>
            <div className="meta">
              {new Date(p.date).toLocaleDateString()} •{" "}
              {p.readingTime ?? "4 min"}
              {p.tags ? ` • ${p.tags.join(", ")}` : ""}
            </div>
            {p.excerpt && <p>{p.excerpt}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
