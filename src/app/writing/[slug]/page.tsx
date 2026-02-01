import Scatterplot3DDemo from '@/components/3d-scatterplot-demo'
import EmbeddingsDemo from '@/components/embeddings-demo'
import EngagementSection from '@/components/engagement-section'
import Footer from '@/components/footer'
import Matrix from '@/components/matrix'
import Note from '@/components/note'
import ReadingModeToggle from '@/components/reading-mode-toggle'
import TokenDemo from '@/components/token-demo'
import { defaultLocale } from '@/lib/locale'
import { getPost } from '@/lib/md'
import { getBaseUrl } from '@/lib/site'
import { getCopy } from '@/lib/static-copy'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const locale = defaultLocale

  try {
    const post = getPost(slug, locale)
    const baseUrl = getBaseUrl()
    const url = `${baseUrl}/writing/${slug}`
    const title = post.frontmatter.title
    const allowDescription = post.frontmatter.shareDescription !== false
    const description = allowDescription ? post.frontmatter.excerpt ?? '' : ''
    const imagePath = post.frontmatter.image ?? '/LLMs.png'
    const imageUrl = new URL(imagePath, baseUrl).toString()

    const metadata: Metadata = {
      title,
      alternates: { canonical: url },
      openGraph: {
        title,
        type: 'article',
        url,
        images: [{ url: imageUrl }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        images: [imageUrl],
      },
    }
    if (allowDescription && description) {
      metadata.description = description
      if (metadata.openGraph) metadata.openGraph.description = description
      if (metadata.twitter) metadata.twitter.description = description
    }
    return metadata
  } catch {
    return {}
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = defaultLocale
  let post
  try {
    post = getPost(slug, locale)
  } catch {
    notFound()
  }
  const copy = getCopy(locale)

  return (
    <main className="writingPage">
      <article className="writingArticle">
        <div className="readingModeToggleRow">
          <ReadingModeToggle />
        </div>
        <header className="writingHeader">
          <div className="writingArticle__tag">
            {post.frontmatter.tags?.[0] ?? 'AI'}
          </div>
          <h1 className="writingArticle__title">{post.frontmatter.title}</h1>
          <div className="writingAuthor">
            <div className="writingAuthor__avatar" aria-hidden="true" />
            <div className="writingAuthor__info">
              <span>{copy.article.byLabel}</span>
              <span>
                {copy.article.publishedOnPrefix}
                {post.frontmatter.date}
                {copy.article.publishedOnSuffix}
              </span>
            </div>
          </div>
        </header>

        <div className="writingArticle__body">
          <MDXRemote
            source={post.content}
            components={{
              TokenDemo,
              EmbeddingsDemo,
              Matrix,
              Note,
              Scatterplot3DDemo,
            }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>

        <EngagementSection slug={slug} locale={locale} />
      </article>

      <Footer />
    </main>
  )
}
