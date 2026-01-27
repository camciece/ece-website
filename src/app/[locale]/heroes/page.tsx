import type { Locale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function HeroesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const copy = getCopy(locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <p className="simpleLead">{copy.heroes.lead}</p>
      </section>
    </main>
  )
}
