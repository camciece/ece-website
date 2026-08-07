import fs from "fs";
import matter from "gray-matter";
import path from "path";

import type { Locale } from "@/lib/locale";

const postsDir = path.join(process.cwd(), "content", "posts");

type Localized<T> = T | Partial<Record<Locale, T>>;
const localizedPostBodyPattern = /\.(?:tr|en)\.mdx?$/;

const normalizeLocalized = <T>(value: Localized<T>, locale: Locale): T => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const localized = value as Partial<Record<Locale, T>>;
    return localized[locale] ?? localized.tr ?? localized.en ?? Object.values(localized)[0] as T;
  }
  return value as T;
};

export type PostCategory = "ai-series" | "projects" | "heroes";

export const POST_CATEGORIES: PostCategory[] = ["ai-series", "projects", "heroes"];

export const isPostCategory = (value: unknown): value is PostCategory =>
  typeof value === "string" && (POST_CATEGORIES as string[]).includes(value);

// Cross-cutting topics within a category (a post can carry more than one),
// e.g. an AI Series post can bridge both the infra and app layers.
export type PostTag = "ai-infra" | "ai-apps";

export const POST_TAGS: PostTag[] = ["ai-infra", "ai-apps"];

export const isPostTag = (value: unknown): value is PostTag =>
  typeof value === "string" && (POST_TAGS as string[]).includes(value);

export const buildWritingHref = (category?: PostCategory, tags: PostTag[] = []) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  tags.forEach((tag) => params.append("tag", tag));
  const query = params.toString();
  return query ? `/writing?${query}` : "/writing";
};

const parsePostTags = (value: unknown): PostTag[] =>
  Array.isArray(value) ? value.filter(isPostTag) : [];

export type PostMeta = {
  title: string;
  date: string;
  excerpt?: string;
  tags: PostTag[];
  category: PostCategory;
  readingTime?: string;
  image?: string;
  shareDescription?: boolean;
  slug: string;
};

export function getAllPosts(locale: Locale): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter(
      (f) =>
        (f.endsWith(".md") || f.endsWith(".mdx")) &&
        !localizedPostBodyPattern.test(f),
    )
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(raw);
      const title = normalizeLocalized(data.title, locale);
      const excerpt = data.excerpt
        ? normalizeLocalized(data.excerpt, locale)
        : undefined;
      const tags = parsePostTags(data.tags);
      const category = isPostCategory(data.category) ? data.category : "ai-series";
      const readingTime = data.readingTime as string | undefined;
      const image = data.image
        ? (normalizeLocalized(data.image, locale) as string)
        : undefined;
      const shareDescription =
        typeof data.shareDescription === "boolean" ? data.shareDescription : undefined;
      const date =
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date);
      return { slug, title, excerpt, tags, category, readingTime, date, image, shareDescription };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function getLocalizedPostContent(slug: string, locale: Locale, fallbackContent: string) {
  const candidates = [
    path.join(postsDir, `${slug}.${locale}.mdx`),
    path.join(postsDir, `${slug}.tr.mdx`),
    path.join(postsDir, `${slug}.en.mdx`),
  ];
  const contentPath = candidates.find((candidate) => fs.existsSync(candidate));
  return contentPath ? fs.readFileSync(contentPath, "utf8") : fallbackContent;
}

export function getPost(slug: string, locale: Locale) {
  const full = fs.readFileSync(path.join(postsDir, `${slug}.mdx`), "utf8");
  const { content, data } = matter(full);
  const localizedContent = data.content
    ? normalizeLocalized(data.content, locale)
    : getLocalizedPostContent(slug, locale, content);
  const title = normalizeLocalized(data.title, locale);
  const excerpt = data.excerpt
    ? normalizeLocalized(data.excerpt, locale)
    : undefined;
  const tags = parsePostTags(data.tags);
  const readingTime = data.readingTime as string | undefined;
  const image = data.image
    ? (normalizeLocalized(data.image, locale) as string)
    : undefined;
  const shareDescription =
    typeof data.shareDescription === "boolean" ? data.shareDescription : undefined;
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    content: localizedContent,
    frontmatter: { title, excerpt, tags, readingTime, date, image, shareDescription },
  };
}
