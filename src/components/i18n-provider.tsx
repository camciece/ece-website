'use client'

import i18n from '@/lib/i18n'
import type { Locale } from '@/lib/locale'
import { useEffect } from 'react'

export default function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: Locale
}) {
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }

    document.documentElement.lang = locale
  }, [locale])

  return <>{children}</>
}
