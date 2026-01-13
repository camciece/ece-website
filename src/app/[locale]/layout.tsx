import Header from '@/components/header'
import I18nProvider from '@/components/i18n-provider'
import { defaultLocale, isLocale, type Locale } from '@/lib/locale'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const resolvedParams = await params
  const locale = isLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : defaultLocale

  return (
    <I18nProvider locale={locale}>
      <Header locale={locale} />
      <div>{children}</div>
    </I18nProvider>
  )
}
