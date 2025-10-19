import { getAllPosts } from "@/lib/md";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold">Ece Çamcı</h1>
        <p className="mt-2 text-zinc-600">
          AI-driven product & partner marketing leader. I write about AI in
          practice, distributed cloud, and GTM.
        </p>
        <div className="mt-4 flex gap-4">
          <Link href="/writing" className="underline">
            Read the blog
          </Link>
          <Link href="/about" className="underline">
            About
          </Link>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Latest writing</h2>
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/writing/${p.slug}`}
                className="text-lg font-medium underline"
              >
                {p.title}
              </Link>
              <p className="text-sm text-zinc-600">
                {new Date(p.date).toLocaleDateString()}
              </p>
              <p className="mt-1">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
