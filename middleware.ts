import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale } from './src/lib/locale'

const publicFile = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const oldSlugPath = '/writing/2025-10-19-why-ai-needs-boring-ops'
  const newSlugPath = '/writing/llmler-nasil-calisiyor'
  const normalizedPath = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname

  if (normalizedPath.endsWith(oldSlugPath)) {
    const prefix = normalizedPath.slice(0, -oldSlugPath.length)
    const prefixSegment = prefix.split('/')[1]
    const targetLocale = isLocale(prefixSegment) ? prefixSegment : defaultLocale
    const url = request.nextUrl.clone()
    url.pathname = `/${targetLocale}${newSlugPath}`
    return NextResponse.redirect(url)
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segment = pathname.split('/')[1]
  const locale = isLocale(segment) ? segment : defaultLocale

  if (!isLocale(segment)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!_next).*)'],
}
