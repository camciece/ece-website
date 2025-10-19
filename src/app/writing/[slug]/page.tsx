import { getPost } from "@/lib/md";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export default async function Post({ params }: { params: { slug: string } }) {
  try {
    const { content, frontmatter } = getPost(params.slug);
    return (
      <article className="prose prose-zinc max-w-3xl mx-auto px-6 py-16">
        <h1>{frontmatter.title}</h1>
        <p className="text-sm text-zinc-600">
          {new Date(frontmatter.date).toLocaleDateString()} •{" "}
          {frontmatter.readingTime ?? "4 min"}
        </p>
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
            },
          }}
        />
      </article>
    );
  } catch {
    return notFound();
  }
}
