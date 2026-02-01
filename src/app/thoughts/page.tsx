import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function ThoughtsPage() {
  const locale = defaultLocale
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
