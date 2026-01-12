import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale } from './src/lib/locale'

const publicFile = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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
