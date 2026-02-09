import { defaultLocale } from '@/lib/locale'
import { getCopy } from '@/lib/static-copy'

export default async function ProjectsPage() {
  const locale = defaultLocale
  const copy = getCopy(locale)
  return (
    <main className="simplePage">
      <section className="simpleSection">
        <p className="simpleLead">{copy.projects.lead}</p>
      </section>
    </main>
  )
}
