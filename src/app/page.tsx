import { redirect } from 'next/navigation'

import { defaultLocale } from '@/lib/locale'

export default function HomePage() {
  redirect(`/${defaultLocale}`)
}
