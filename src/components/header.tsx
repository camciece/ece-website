'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Work' },
  { href: '/writing', label: 'Meet Ece' },
  { href: '/about', label: 'Books' },
  { href: '/contact', label: 'Heroes' },
]

export default function Header() {
  const pathname = usePathname() || '/'

  return (
    <header className="topBar">
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
            <button type="button" className="menuBtn" aria-label="Menu">
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
    </header>
  )
}
