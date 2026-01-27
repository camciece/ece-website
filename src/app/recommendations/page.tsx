import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function RecommendationsPage() {
  const locale = defaultLocale
  const copy = getCopy(locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <p className="simpleLead">{copy.recommendations.lead}</p>
      </section>
    </main>
  )
}
