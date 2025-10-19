import { getAllPosts } from "@/lib/md";
import Link from "next/link";

export default function Writing() {
  const posts = getAllPosts();
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Writing</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/writing/${p.slug}`}
              className="text-xl font-semibold underline"
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
    </main>
  );
}
