'use client'

import '@/lib/i18n'
import { useEffect } from 'react'

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // i18n is initialized on import
  }, [])

  return <>{children}</>
}
