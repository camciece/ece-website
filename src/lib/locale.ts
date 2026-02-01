export const locales = ['tr'] as const // 'en' removed
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

// Updated to not add locale prefix - just returns the pathname as-is
export function withLocale(pathname: string): string {
  // Remove any existing locale prefix and return clean path
  const base = stripLocale(pathname.startsWith('/') ? pathname : `/${pathname}`)
  return base
}
