export const locales = ['en', 'tr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'tr'

export function isLocale(value?: string | null): value is Locale {
  return locales.includes(value as Locale)
}

const localePrefix = new RegExp(`^/(?:${locales.join('|')})(?=/|$)`, 'i')

export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(localePrefix, '')
  return stripped.length === 0 ? '/' : stripped
}

export function withLocale(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname.startsWith('/') ? pathname : `/${pathname}`)
  return base === '/' ? `/${locale}` : `/${locale}${base}`
}
