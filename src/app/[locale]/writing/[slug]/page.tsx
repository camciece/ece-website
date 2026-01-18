import Footer from '@/components/footer'
import type { Locale } from '@/lib/locale'
import { getPost } from '@/lib/md'
import { getCopy } from '@/lib/static-copy'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import EmbeddingsDemo from '@/components/embeddings-demo'
import TokenDemo from '@/components/token-demo'

export default function Post({
  params,
}: {
  params: { locale: Locale; slug: string }
}) {
  let post
  try {
    post = getPost(params.slug, params.locale)
  } catch {
    notFound()
  }
  const copy = getCopy(params.locale)

  return (
    <main className="writingPage">
      <article className="writingArticle">
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
            components={{ TokenDemo, EmbeddingsDemo }}
          />
        </div>
      </article>

      <Footer locale={params.locale} />
    </main>
  )
}
