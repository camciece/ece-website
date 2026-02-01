import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { Locale } from "@/lib/locale";

const postsDir = path.join(process.cwd(), "content", "posts");

type Localized<T> = T | { en: T; tr: T };

const normalizeLocalized = <T>(value: Localized<T>, locale: Locale): T => {
  if (value && typeof value === "object" && "en" in value && "tr" in value) {
    return (value as { en: T; tr: T })[locale];
  }
  return value as T;
};

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
  slug: string;
};

export function getAllPosts(locale: Locale): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(raw);
      const title = normalizeLocalized(data.title, locale);
      const excerpt = data.excerpt
        ? normalizeLocalized(data.excerpt, locale)
        : undefined;
      const tags = data.tags ? (data.tags as string[]) : undefined;
      const readingTime = data.readingTime as string | undefined;
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date);
      return { slug, title, excerpt, tags, readingTime, date };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string, locale: Locale) {
  const full = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), "utf8");
  const { content, data } = matter(full);
  const localizedContent = data.content
    ? normalizeLocalized(data.content, locale)
    : content;
  const title = normalizeLocalized(data.title, locale);
  const excerpt = data.excerpt
    ? normalizeLocalized(data.excerpt, locale)
    : undefined;
  const tags = data.tags ? (data.tags as string[]) : undefined;
  const readingTime = data.readingTime as string | undefined;
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    content: localizedContent,
    frontmatter: { title, excerpt, tags, readingTime, date },
  };
}
