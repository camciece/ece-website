import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default function HeroesPage({ params }: { params: { locale: Locale } }) {
  const copy = getCopy(params.locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <p className="simpleLead">{copy.heroes.lead}</p>
      </section>
    </main>
  )
}
