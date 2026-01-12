import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default function RecommendationsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const copy = getCopy(params.locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <p className="simpleLead">{copy.recommendations.lead}</p>
      </section>
    </main>
  )
}
