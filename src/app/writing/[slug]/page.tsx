// src/app/writing/[slug]/page.tsx
import { getPost } from "@/lib/md";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const { content, frontmatter } = getPost(params.slug);
    return (
      <article className="prose prose-invert max-w-none">
        <Link href="/writing">← All writing</Link>
        <h1>{frontmatter.title}</h1>
        <p className="meta">
          {new Date(frontmatter.date).toLocaleDateString()}
          {frontmatter.readingTime ? ` • ${frontmatter.readingTime}` : ""}
          {frontmatter.tags ? ` • ${frontmatter.tags.join(", ")}` : ""}
        </p>
        {/* SADECE BU — content'i ikinci kez string olarak basma */}
        <MDXRemote source={content} />
      </article>
    );
  } catch {
    return notFound();
  }
}
