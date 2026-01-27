import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function HeroesPage() {
  const locale = defaultLocale
  const copy = getCopy(locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <p className="simpleLead">{copy.heroes.lead}</p>
      </section>
    </main>
  )
}
