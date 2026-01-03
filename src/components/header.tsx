'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/writing', label: 'Writings' },
  { href: '/meet-ece', label: 'Meet Ece' },
  { href: '/recommendations', label: 'Recommendations' },
  { href: '/heroes', label: 'Heroes' },
]

export default function Header() {
  const pathname = usePathname() || '/'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`topBar ${menuOpen ? 'topBar--open' : ''}`}>
      <div className="topBar__wrap">
        {/* LEFT island */}
        <div className="island island--logo">
          <Link href="/" className="logoLink" aria-label="Home">
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
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menuIcon" aria-hidden />
            </button>
            <Link href="/" className="logoCenter" aria-label="Home">
              EcesNotes
            </Link>
            <button type="button" className="searchIconBtn" aria-label="Search">
              <span className="searchIcon" aria-hidden />
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
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* RIGHT island */}
        <div className="island island--search">
          <button type="button" className="searchIconBtn" aria-label="Search">
            <span className="searchIcon" aria-hidden />
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
                {l.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
