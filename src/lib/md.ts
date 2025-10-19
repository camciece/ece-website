import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
  slug: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(raw);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { slug, ...(data as any) } as PostMeta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string) {
  const full = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), "utf8");
  const { content, data } = matter(full);
  return { content, frontmatter: data as Omit<PostMeta, "slug"> };
}
