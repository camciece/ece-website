import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default function ThoughtsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const copy = getCopy(params.locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <h1 className="simpleTitle">{copy.thoughts.title}</h1>
        <p className="simpleLead">{copy.thoughts.lead}</p>
      </section>
    </main>
  )
}
