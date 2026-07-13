'use client'

import { localeCookieName, stripLocale, type Locale } from '@/lib/locale'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const links = [
  { href: '/writing', label: 'nav.writings' },
  { href: '/meet-ece', label: 'nav.meetEce' },
  { href: '/projects', label: 'nav.projects' },
  { href: '/heroes', label: 'nav.heroes' },
]

export default function Header() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const { i18n, t } = useTranslation()
  const locale = (i18n.language === 'en' ? 'en' : 'tr') as Locale
  const currentPath = stripLocale(pathname)

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'tr' : 'en'

    document.cookie = `${localeCookieName}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    i18n.changeLanguage(newLocale)
    document.documentElement.lang = newLocale
    setMenuOpen(false)
    router.refresh()
  }

  return (
    <header className={`topBar ${menuOpen ? 'topBar--open' : ''}`}>
      <div className="topBar__wrap">
        {/* LEFT island */}
        <div className="island island--logo">
          <Link href="/" className="logoLink" aria-label={t('nav.home')}>
            <span className="logoBadge">
              Eces
              <br />
              Notes
            </span>
          </Link>
        </div>

        {/* CENTER island (absolute centered) */}
        <div
          className="island island--nav island--navCentered"
          aria-label="Primary"
        >
          <div className="navCompact" aria-label="Primary">
            <button
              type="button"
              className="menuBtn"
              aria-label={t('nav.menu')}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menuIcon" aria-hidden />
            </button>
            <Link href="/" className="logoCenter" aria-label={t('nav.home')}>
              EcesNotes
            </Link>
            <button
              type="button"
              onClick={toggleLanguage}
              className="languageBtn"
              aria-label={t('language.switchTo', {
                lang: locale === 'en' ? t('language.tr') : t('language.en'),
              })}
            >
              {locale === 'en' ? 'EN' : 'TR'}
            </button>
          </div>
          <nav className="navRow">
            {links.map((l) => {
              const active =
                l.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(l.href)
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`navPill ${active ? 'isActive' : ''}`}
                >
                  {t(l.label)}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* RIGHT island */}
        <div className="island island--search">
          <button
            type="button"
            onClick={toggleLanguage}
            className="languageBtn"
            aria-label={t('language.switchTo', {
              lang: locale === 'en' ? t('language.tr') : t('language.en'),
            })}
          >
            {locale === 'en' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>

      <div className="mobileMenu" aria-hidden={!menuOpen}>
        <nav className="mobileMenu__nav" aria-label="Mobile">
          {links.map((l) => {
            const active =
              l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`mobileMenu__link ${active ? 'isActive' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(l.label)}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
