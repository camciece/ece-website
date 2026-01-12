'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const links = [
  { href: '/writing', label: 'nav.writings' },
  { href: '/meet-ece', label: 'nav.meetEce' },
  { href: '/recommendations', label: 'nav.recommendations' },
  { href: '/heroes', label: 'nav.heroes' },
]

export default function Header() {
  const pathname = usePathname() || '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en'
    i18n.changeLanguage(newLang)
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
              className="searchIconBtn"
              aria-label={t('language.switchTo', {
                lang:
                  i18n.language === 'en' ? t('language.tr') : t('language.en'),
              })}
            >
              {i18n.language === 'en' ? 'EN' : 'TR'}
            </button>
          </div>
          <nav className="navRow">
            {links.map((l) => {
              const active =
                l.href === '/' ? pathname === '/' : pathname.startsWith(l.href)
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
            className="searchIconBtn"
            aria-label={t('language.switchTo', {
              lang:
                i18n.language === 'en' ? t('language.tr') : t('language.en'),
            })}
          >
            {i18n.language === 'en' ? 'EN' : 'TR'}
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
