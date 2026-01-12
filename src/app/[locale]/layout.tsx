import Header from '@/components/header'
import I18nProvider from '@/components/i18n-provider'
import type { Locale } from '@/lib/locale'

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  return (
    <I18nProvider locale={params.locale}>
      <Header locale={params.locale} />
      <div>{children}</div>
    </I18nProvider>
  )
}
