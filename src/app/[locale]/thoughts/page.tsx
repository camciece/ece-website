import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function ThoughtsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const copy = getCopy(locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <h1 className="simpleTitle">{copy.thoughts.title}</h1>
        <p className="simpleLead">{copy.thoughts.lead}</p>
      </section>
    </main>
  )
}
