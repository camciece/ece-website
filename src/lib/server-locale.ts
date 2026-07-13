import { cookies } from 'next/headers'

import { defaultLocale, isLocale, localeCookieName } from '@/lib/locale'

export async function getRequestLocale() {
  const cookieStore = await cookies()
  const locale = cookieStore.get(localeCookieName)?.value

  return isLocale(locale) ? locale : defaultLocale
}
